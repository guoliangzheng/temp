import React, { Component } from "react";
import ReactDOM from "react-dom";
import { map, omit, pick } from "lodash";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Input } from 'antd';

import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";

import styles from "./index.css";
import ContentEditable from "./content-editable";
import PropTypes from 'prop-types'
@observer
export default class TextElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object,
      children: PropTypes.node,
      defaultText: PropTypes.array
    })
  }

  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }

 
  render() {
    const componentProps = this.props.component.props;

    let tagName = "div";
    if (componentProps.listType === "ordered") {
      tagName = "ol";
    } else if (componentProps.listType === "unordered") {
      tagName = "ul";
    }

    const classes = classNames({
      [styles.content]: true,
      [styles.quote]: componentProps.isQuote
    });

    let width = componentProps.style.width ? componentProps.style.width : "auto";
    width = this.props.rect ? this.props.rect.width : width;
    let height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    return (
      <div 
      key={this.props.index}
      className={this.props.classes}
      onMouseDown={this.props.mouseDownAction}
      onDragOver={this.props.dragOverAction}
      style={{top:this.props.postions.top,left:this.props.postions.left}}
      >
            <CanvasElement
              {...pick(this.props, Object.keys(CanvasElementPropTypes))}
              resizeHorizontal={true}
              resizeVertical={true}
              getSize={this.getSize}
            > 
          {/* <Input placeholder="Input 1" />
          <Input ref={el => { this.inputElement = ReactDOM.findDOMNode(el); }}
          
          placeholder="Input 2" defaultValue="Value on load" />
           */}      
          <Input  style={{width:width,height:height,}} />

             {/*      <input  ref={el => { this.inputElement = ReactDOM.findDOMNode(el); }}
       ></input>  */}
            </CanvasElement>
      </div>
    );
  }
}
