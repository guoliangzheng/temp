import React, { Component} from "react";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";

import styles from "./index.css";
import PropTypes, { element } from 'prop-types';
import ElementList from '../element-list';
import { ElementTypes, MODES } from "../constants";
/* import Elements from "../elements";
 */
import SnapLines from "./snap-lines";
import * as constraints from "./constraints";
import Slide from "./slide";
import PropertyEditor  from './property-editor'
import { Button } from 'antd';

@observer
class Canvas extends Component  {
     static contextTypes = {
        store: PropTypes.object
      }; 
    
      constructor(props) {
        super(props);
        this.state = { };
      }
     componentDidMount() {
        this.resize();
    
        window.addEventListener("load", this.resize);
        window.addEventListener("resize", this.resize);
      }
      componentWillUnmount() {
        window.removeEventListener("load", this.resize);
        window.removeEventListener("resize", this.resize);
      }
     
      getDropPosition=(dropTagId)=>{

         return   this.context.store.getDropPosition(dropTagId);

      }
    
      getDefaultSize = (type) => {

        const width=12;
        const height = 12;
       /*  const element = Elements[type];
        const height = element.defaultHeight || element.props.style.height;
        const width = element.defaultWidth || element.props.style.width; */
        return { width, height };
      } 
      // Keep a 4:3 ratio with the inner element centered, 30px padding
      resize = () => {
        const { offsetWidth, offsetHeight } = findDOMNode(this.refs.container);
        const width = offsetWidth;
        const height = offsetHeight;
    
        // TODO: need better logic for handling scale and content scale
        const shouldScale = offsetWidth < 1000 || offsetHeight < 700;
    
        const xScale = offsetWidth < 1000 ? offsetWidth / 1000 : 1;
        const yScale = offsetHeight < 700 ? offsetHeight / 700 : 1;
    
        this.scale = shouldScale ? Math.min(xScale, yScale) : 1;
    
        const scaleXOffset = width - (1000 * this.scale);
        const scaleYOffset = height - (700 * this.scale);
    
        const left = Math.floor(scaleXOffset / 2);
        const top = Math.floor(scaleYOffset / 2);
    
        this.context.store.setCanvasSize({
          width: 1000 * this.scale,
          height: 700 * this.scale,
          left,
          top,
          scale: this.scale
        });
      }
    
      handleDragStart = (e, type) => {
        this.context.store.setCurrentElement(null);
    
        const scale = this.context.store.scale;
        const defaultSize = this.getDefaultSize(type);
        const position = {};
        const slideOffset = findDOMNode(this.slideRef).getBoundingClientRect();
        position.left = (e.clientX - slideOffset.left - (defaultSize.width * scale / 2)) / scale;
        position.top = (e.clientY - slideOffset.top - (defaultSize.height * scale / 2)) / scale;
        const rect = {
          ...position,
          ...defaultSize
        };
    
        this.setState({
          startMousePosition: { x: e.clientX, y: e.clientY },
          startRect: rect,
          elementType: type,
          elementRect: rect,
          snapLines: this.slideRef.getSnapLines(),
          activeSnapLines: []
        }); 
      }
    
      handleDrag = (e) => {
        const size = { ...this.state.startRect };
        size.left += (e.clientX - this.state.startMousePosition.x) / this.context.store.scale;
        size.top += (e.clientY - this.state.startMousePosition.y) / this.context.store.scale;
        const results = constraints.constrainGrid(size, this.state.snapLines, MODES.MOVE);
        this.setState({
          elementRect: results.size,
          activeSnapLines: results.lines
        }); 
      }
    
      handleDragStop = () => {
         this.setState({
          startMousePosition: null,
          elementType: null,
          elementRect: null,
          snapLines: [],
          activeSnapLines: []
        }); 
      }
    
      handleDrop = (type,dropTagID, extraProps) => {
      //   const rect = this.state.elementRect || this.getDefaultPosition(type);
        this.context.store.dropElement(type,dropTagID,extraProps);  
      } 
      elementFromType = (type) => {
        return null;
      }
      render(){
        const {
          isDraggingElement,
          isDraggingSlide,
          scale,
          top,
          left
         } = this.context.store;   
         return (
          <div 
            className={styles.canvasWrapper}
            style={{
             
              cursor: isDraggingElement ? "move" : "auto",
              pointerEvents: isDraggingSlide ? "none" : "auto"
            }}
          >
           
        <div  style={{float:'left', display:'inline-block',width:200}}>
        <ElementList 
          scale={scale}
          getDropPosition={this.getDropPosition}
          onDrop={this.handleDrop}
        />
        </div>
        <div
            style={{
              width: 1000,
              height: 700,
              cursor: isDraggingElement ? "move" : "auto",
              pointerEvents: isDraggingSlide ? "none" : "auto"
            }}
          >
          <Button onClick={()=>{alert(this.context.store.serialize())}} >保存</Button>
          <Button onClick={()=>this.context.store.save()} >生成</Button>
          <Button onClick={()=>this.context.store.deserialize()} >预览</Button>
          <div className={styles.canvas} style={{float:'left',display:'inline-block',}} id="canvas" ref="container">
              <div
                style={{
                  transformOrigin: "top left",
                  transform: `scale(${scale})`,
                  width: 1000, 
                  height: 700,
                  top,
                  left,
                  backgroundColor: "#999"
                }}
              >  
                <Slide
                  ref={(slide) => { this.slideRef = slide; }}
                  scale={scale}
                />
                <SnapLines lines={this.state.activeSnapLines} scale={scale} />
              </div>
            </div>
           </div>
           <PropertyEditor/>
          </div>
        );
      }

}
export default Canvas 