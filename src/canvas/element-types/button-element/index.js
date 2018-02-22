import React, { Component } from "react";
import ReactDOM from "react-dom";
import { map, omit, pick } from "lodash";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Button } from 'element-react';
import _ from "lodash";
import TilteUtil from '../../util/titleUtil'
import { findDOMNode } from "react-dom";

import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";

import styles from "./index.css";
import PropTypes from 'prop-types'
@observer
export default class ButtonElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object,
      children: PropTypes.node
    })
  }

  getSize = () => {
    const {width,height}=this.context.store.getDom(this.props.index).getBoundingClientRect();
    console.log("text width height",width,height);
    return  {
    width,
    height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  }}
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
  }
  render() {
    const componentProps = this.props.component.props;
    const {event,binding} =  this.props.component;
    const {label} = componentProps;
    const {actions,dataSet} = this.context.store;
    const bingdingValue =dataSet.has(binding)?dataSet.get(binding).data:'';
    let width = componentProps.style.width ? componentProps.style.width : "auto";
    width = this.props.rect ? this.props.rect.width : width;
    let height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const eventObject = {};
    for(var key in event){
        const newKey  ="on"+TilteUtil.titleCase(key);
        eventObject[newKey]=actions.has(event[key])?actions.get(event[key]).action:null;
    }
    return (
      <div 
      key={this.props.index}
      className={this.props.classes}
      onMouseDown={this.props.mouseDownAction}
      onDragOver={this.props.dragOverAction}
      style={{top:this.props.postions.top,left:this.props.postions.left,width,height}}
      >
            <CanvasElement
              {...pick(this.props, Object.keys(CanvasElementPropTypes))}
              resizeVertical={false}
              getSize={this.getSize}
            >      
            <Button  {...componentProps} {...eventObject} value={bingdingValue}  style={{width:'100%',height:height}} >
             {label}
            </Button>
            </CanvasElement>
      </div>
    );
  }
}
