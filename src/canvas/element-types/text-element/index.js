import React, { Component } from "react";
import ReactDOM from "react-dom";
import { map, omit, pick } from "lodash";
import { observer } from "mobx-react";
import classNames from "classnames";
import { Input } from 'antd';

import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";

import styles from "./index.css";
import PropTypes from 'prop-types'
@observer
export default class TextElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object,
      children: PropTypes.node
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
    const {event,binding} = componentProps;
    const {actions,dataSet} = this.context.store;
    const {onfocus} =event;
    const bingdingValue =dataSet.has(binding)?dataSet.get(binding).data:'';
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
              getSize={this.getSize}
            >      
               <Input onFocus={()=>{try{ if(actions.has(onfocus)){actions.get(onfocus).action(actions,dataSet)}}catch(e){} }} value={bingdingValue} style={{width:width,height:height,}} />
            </CanvasElement>
      </div>
    );
  }
}
