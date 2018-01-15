import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";

import styles from "./slide.css";
import * as constraints from "./constraints";
import SnapLines from "./snap-lines";
import elementFromType from "./element-types";

@observer
class Slide extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired
  };

  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      snapLines: [],
      activeSnapLines: []
    };

    this.elementRefs = {};
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    document.addEventListener("keyup", this.handleKeyUp);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    document.removeEventListener("keyup", this.handleKeyUp);
  }

  getSnapLines = () => {
    const rects = [];

    this.context.store.currentSlide.children.forEach((child, idx) => {
      if (idx === this.context.store.currentElementIndex) return;
      rects.push(this.elementRefs[child.id].getSize());
    });

    const lines = constraints.rectToSnapLines({
      top: 0,
      left: 0,
      width: this.context.store.width / this.props.scale,
      height: this.context.store.height / this.props.scale
    });

    return lines.concat(constraints.rectsToSnapLines(rects));
  }

  runConstraints = (e, originalSize, nextSize, mode) => {
    let constrained = constraints.constrainWidthHeight(nextSize, 30, 30, mode);
    const results = constraints.constrainGrid(constrained, this.state.snapLines, mode);
    constrained = results.size;
    if (e.shiftKey && mode !== MODES.MOVE) {
      constrained = constraints.constrainRatio(originalSize, constrained, results.closest, mode);
    }
    constrained = constraints.constrainCanvasBounds(constrained,
                                                    this.context.store.width / this.props.scale,
                                                    this.context.store.height / this.props.scale,
                                                    mode);

    this.setState({ activeSnapLines: results.lines, intermediarySize: constrained });
  }

  calculateSnapLines = () => {
    this.setState({
      snapLines: this.getSnapLines(),
      activeSnapLines: []
    });
  }

  persistSize = (mode) => {
    const size = this.state.intermediarySize;
    if (!size) return;

    const updates = {
      style: {
        left: size.left,
        top: size.top
      }
    };

    if (mode !== MODES.MOVE) {
      updates.style.width = size.width;
      updates.style.height = size.height;
    }

    this.context.store.updateElementProps(updates);
  }

  handleResize = (e, originalSize, nextSize, mode) => {
    this.runConstraints(e, originalSize, nextSize, mode);
  }

  handleResizeStart = () => {
    this.stopNudging();
    this.calculateSnapLines();
    this.context.store.updateElementResizeState(true);
  }

  handleResizeStop = (mode) => {
    this.persistSize(mode);
    this.context.store.updateElementResizeState(false);
    this.setState({ activeSnapLines: [], intermediarySize: null });
  }

  handleDrag = (e, originalSize, nextSize, mode) => {
    this.runConstraints(e, originalSize, nextSize, mode);
  }

  handleMouseOver=(id)=>{
    this.context.store.setMouserOverElement(id);    
  }

  handleDragStart = () => {
    this.stopNudging();
    this.calculateSnapLines();
    this.context.store.updateElementDraggingState(true);
  }

  handleDragStop = (mode) => {
    this.persistSize(mode);
    this.context.store.updateElementDraggingState(false);
    this.setState({ activeSnapLines: [], intermediarySize: null });
  }

  handleMouseDown = (id) => {
    this.stopNudging();
    this.context.store.setCurrentElement(id);
  }   
  stopNudging = () => {
    if (this.isNudging) {
      this.isNudging = false;
      this.handleDragStop(MODES.MOVE);
    }
  }

  handleKeyDown = (e) => {
    // bail if something else is focused
    if (e.target !== document.body) return;

    const currentElement = this.context.store.currentElement;
    if ((e.which === 37 || e.which === 39 || e.which === 38 || e.which === 40) && currentElement) {
      const size = this.state.intermediarySize || this.elementRefs[currentElement.id].getSize();
      const delta = e.shiftKey ? 10 : 1;
      if (e.which === 37) { size.left -= delta; }
      if (e.which === 39) { size.left += delta; }
      if (e.which === 38) { size.top -= delta; }
      if (e.which === 40) { size.top += delta; }

      if (!this.isNudging) {
        this.handleDragStart();
      }
      this.isNudging = true;

      const itemSnapLines = constraints.rectToSnapLines(size, MODES.MOVE);
      const results = constraints.getClosestSnapLines(this.state.snapLines, itemSnapLines);
      const lines = [];
      if (results.horizontal && results.horizontal.distance === 0) {
        lines.push(results.horizontal.line);
      }
      if (results.vertical && results.vertical.distance === 0) {
        lines.push(results.vertical.line);
      }
      this.setState({ intermediarySize: size, activeSnapLines: lines });
    }
  }

  handleKeyUp = () => {
    this.stopNudging();
  }



  renderChild = (child) => {
    const id = child.id;
    const store = this.context.store;
    const isSelected = store.currentElement === id;
  
    const childObj = store.components.get(id);
    if(!childObj) return;
    const classes = classNames({
      [styles.slideItem]: true,
      [styles.isSelected]: isSelected,
      [BLACKLIST_CURRENT_ELEMENT_DESELECT]: isSelected
    });

    const intermediarySize = isSelected ? this.state.intermediarySize : null;
 
    const Element = elementFromType.get(childObj.type);
    return (
      <div
        key={childObj.id}
        className={classes}
        onMouseDown={this.handleMouseDown.bind(null, childObj.id)}
        onDragOver={this.handleMouseDown.bind(null, childObj.id)}
        style={{
          top: intermediarySize ? intermediarySize.top : childObj.props.style.top,
          left: intermediarySize ? intermediarySize.left : childObj.props.style.left
        }}
      >
        <Element
          component={childObj}
          ref={(el) => { this.elementRefs[childObj.id] = el; }}
          scale={this.props.scale}
          rect={intermediarySize}
          onResize={this.handleResize}
          onResizeStart={this.handleResizeStart}
          onResizeStop={this.handleResizeStop}
          onDrag={this.handleDrag}
          onDragStart={this.handleDragStart}
          onDragStop={this.handleDragStop}
          
          isSelected={isSelected}
          isResizing={isSelected && store.isResizing}
          isDragging={isSelected && store.isDragging}
          resizeHorizontal={isSelected && !store.isDragging}
          resizeVertical={isSelected && !store.isDragging}
          canArrange={isSelected && !store.isResizing && !store.isDragging}
          draggable
        >
        
        {childObj.children!=null && childObj.children.map(this.renderChild) }
        </Element>
      </div>
    );
  }

  render() {
     const {store:{components,rootID}} = this.context;
    if (!components) return null;
    const classes = classNames({
      [styles.slide]: true,
      [styles.isDragging]: this.context.store.isDragging
    });
    const currentSlide = components.get(rootID);
    return (
      <div className={classes} style={{ ...currentSlide.props.style }} id="slide">
        {currentSlide && rootID && currentSlide.children.map(this.renderChild)}
        <SnapLines lines={this.state.activeSnapLines} scale={this.props.scale} />
      </div>
    );
  }
}

export default Slide;
