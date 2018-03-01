import React, { Component} from "react";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";
import styles from "./index.css";
import PropTypes, { element } from 'prop-types';
import ElementList from '../element-list';
import { ElementTypes, MODES } from "../constants";

import SnapLines from "./snap-lines";
import * as constraints from "./constraints";
import Slide from "./slide";
import PropertyEditor  from './property-editor'
import { Button } from 'antd';
import ComponentTree from './componentTree'
import Tools from './tools'
import HRuler from './hRuler';
import VRuler from './vRuler'
@observer
class Canvas extends Component  {
     static contextTypes = {
        store: PropTypes.object
      }; 
    
      constructor(props) {
        super(props);
        this.state = {elemenetlistWidth:244 };
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
      //收缩列表
      foldElementList=()=>{
        this.setState({elemenetlistWidth:82});
      }
      //展开列表
      spreadElementList=()=>{
        this.setState({elemenetlistWidth:244});
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
/*         const shouldScale = offsetWidth < 1000 || offsetHeight < 700;
 */    const shouldScale=false;
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
        const {elemenetlistWidth} =this.state;
        const {
          isDraggingElement,
          isDraggingSlide,
          scale,
          top,
          left,
         } = this.context.store;   
         return (
          <div 
            className={styles.canvasWrapper}
            style={{
              cursor: isDraggingElement ? "move" : "auto",
              pointerEvents: isDraggingSlide ? "none" : "auto"
            }}
          >   
        {/*工具类懒*/}
         <div className={styles.toolbar}>
            <Tools/>
         </div>        
         <div className={styles.mainContent}>     
              {/*组件选择的列表*/}
              <aside  className={styles.elemenetlist}   style={{width:elemenetlistWidth}}>
                <ElementList 
                  scale={scale}
                  getDropPosition={this.getDropPosition}
                  onDrop={this.handleDrop}
                  fold = {this.foldElementList}
                  spread = {this.spreadElementList}
                />
              </aside>
              {/*组件树结构展示*/}
              <div  className={styles.componentTree}   style={{width:200}}>
                 <ComponentTree />
              </div>
            {/*画板部分*/}
            <div className={styles.canvas}  id="canvas" ref="container">
                <div
                  style={{
                    transformOrigin: "top left",
                    width: '100%', 
                    height: '100%',
                    transform: `scale(${scale})`,//控制缩放的部分
                    top,
                    left,
                    backgroundColor: "#999"
                  }}
                > 
                <div style={{display: 'flex',width:'100%',height:'16px'}}>
                   <a style={{backgroundColor:' rgb(249, 250, 251)'}}  title=""></a>
                  {/*上边标尺*/}
                  <HRuler/>
                </div>
                 <div style={{display: 'flex',width:'100%',height:'100%'}}>
                  {/*左标尺*/}
                    <VRuler/>
                    {/*-从这个地方开始真正的绘制图像-*/}
                    <div style={{  float: 'right', width:'100%',height:'100%'}}>
                      <Slide
                        ref={(slide) => { this.slideRef = slide; }}
                        scale={scale}
                      />
{/*                       <SnapLines lines={this.state.activeSnapLines} scale={scale} />
 */}                    </div>
                </div>
                </div>
              </div>
              <aside className={styles.propertyEdior} style={{width:244}}>
               <PropertyEditor/>
             </aside>
            </div>
           
          </div>
        );
      }

}
export default Canvas 