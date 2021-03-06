import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";

import styles from "./slide.css";
import * as constraints from "./constraints";
import SnapLines from "./snap-lines";
import elementFromType from "./element-types";
import { DropTarget } from 'react-dnd'
const boxTarget = {
	drop(props,monitor) {

    if(monitor.getDropResult()){
      return {
        id: monitor.getDropResult().id,
      };
    }      
    return { id: props.index}
  },
 
}
@DropTarget("element-types", boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})) 
@observer
class Slide extends Component {
  static propTypes = {
    scale: PropTypes.number.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
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
      document.addEventListener('mouseover',(e)=>{
          this.context.store.setDropTagElement(this.context.store.rootID)
          this.context.store.updateElementParent();
        },false);

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

  handleResizeStart = (event) => {
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

  handleMouseOver=(id,event)=>{
    this.context.store.setMouserOverElement(id);    
    event.stopPropagation();//阻止事件冒泡
  }

  handleDragStart = (event) => {
    this.stopNudging();
    this.calculateSnapLines();
    this.context.store.updateElementDraggingState(true);

  }

  handleDragStop = (mode) => {
    this.persistSize(mode);
    this.context.store.updateElementDraggingState(false);
    this.setState({ activeSnapLines: [], intermediarySize: null });

  }
  handleDrop =(mode)=>{
  }
  handleMouseDown = (id,event) => {
    this.stopNudging();
    this.context.store.setCurrentElement(id);
    event.stopPropagation();//阻止事件冒泡
  }   
  stopNudging = () => {
    if (this.isNudging) {
      this.isNudging = false;
      this.handleDragStop(MODES.MOVE);
    }
  }
  /**绘制高亮线**/
  handleKeyDown = (e) => {
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


  /*递归组件树，用于组件树的渲染 */
  renderChild = (id) => {
/*     const id = child.id;
 */ const store = this.context.store;
    const isSelected = store.currentElement === id;
    const childObj = store.components.get(id);
    if(!childObj) return;
    const classes = classNames({
      [styles.slideItem]: true,
      [styles.isSelected]: isSelected,
      [BLACKLIST_CURRENT_ELEMENT_DESELECT]: isSelected
    });

    const intermediarySize = isSelected ? this.state.intermediarySize : null;
    //取组件的数据机构对应的渲染结构
    const Element = elementFromType.get(childObj.type);
    let top = intermediarySize ? intermediarySize.top : childObj.props.style.top;
    let left= intermediarySize ? intermediarySize.left : childObj.props.style.left
    let width =childObj.props.style.width;
    let height = childObj.props.style.height;
    return (
        <Element
          key = {childObj.id} //对动态组件渲染必要的属性，必须保证唯一
          index={childObj.id} //组件ID
          classes={classes}  //组件选择时的样式
          mouseDownAction={this.handleMouseDown.bind(null, childObj.id)} //鼠标选中时执行的操作
          dragOverAction={this.handleMouseDown.bind(null, childObj.id)}  //鼠标拖拽时执行的操作
          postions={{top:top,left:left}} //组件相对于上级组件的位置
          component={childObj}  //组件的数据结构
          ref={(el) => { this.context.store.setDomRef(childObj.id,el); }} //包装组件实例，用于或者组件真实的高宽等
          scale={this.props.scale} //缩放设置，暂时木用
          rect={intermediarySize}  //暂时没用用到，想用于无法确定大小的对象时使用
          onResize={this.handleResize}  //改变大小时事件
          onResizeStart={this.handleResizeStart} //改变大小开始时
          onResizeStop={this.handleResizeStop}  //改变大小后
          onDrag={this.handleDrag}  //拖拽执行的时间
          onDragStart={this.handleDragStart} 
          onDragStop={this.handleDragStop}
          isSelected={isSelected} //控制是否选中
          isResizing={isSelected && store.isResizing}//控制是否可用改变大小
          isDragging={isSelected && store.isDragging} //控制是否可用改变拖拽
          resizeHorizontal={isSelected && !store.isDragging}//控制是否可以改变高度
          resizeVertical={isSelected && !store.isDragging}//控制是否可以改变宽度
          canArrange={isSelected && !store.isResizing && !store.isDragging}//控制四个角的拖拽的，暂时没用到
          draggable
        > 
        {childObj.children!=null && childObj.children.map(this.renderChild) }
        </Element>
    );
  }

  render() {
   const {store:{components,rootID}} = this.context;
    if (!components) return null;
    const classes = classNames({
      [styles.slide]: true,
      [styles.isDragging]: this.context.store.isDragging
    });
    //取根节点数据进行画板的构造
    const currentSlide = components.get(rootID);
    const { canDrop, isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div canDrop={canDrop} isOver={isOver}   onMouseDown={this.handleMouseDown.bind(null,rootID)}
      ref={(ref)=>{this.context.store.setDomRef(rootID,ref)}}  connectDropTarget={connectDropTarget} className={classes} style={{...currentSlide.props.style }} id={rootID}>
        {currentSlide && rootID && currentSlide.children.map(this.renderChild)}
        <SnapLines lines={this.state.activeSnapLines} scale={this.props.scale} />
      </div>
    );
  }
}

export default Slide;
