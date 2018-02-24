import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./index.css";

export default class VRuler extends Component {

     constructor(props){
         super(props);
         this.oldWidth = 0;
         this.oldHeight = 0;
         this.state = {
           width:100,
           height:100,
         }
         
     }
      componentDidMount(){
        this.drawRuler();
        window.addEventListener('resize', () => this.updateSize());
        this.updateSize();
      }
      componentDidUpdate(){
        this.drawRuler();
      }
      componentWillUnmount() {
        window.removeEventListener('resize', () => this.updateSize());
      }
      drawRuler=()=>{
        var myCanvas = this.refs.myCanvas;
        var ctx = myCanvas.getContext("2d");
        const width = this.refs.container.clientWidth;
        const height = this.refs.container.clientHeight;
        ctx.clearRect(0,0,width,height);
        ctx.lineWidth = 1; 
        ctx.strokeStyle = 'rgba(255,0,0,0.5)'; 

        //高的
        for (var i = 0; i < height/100; i++) {
              const y = i*100;
              ctx.moveTo(0, y);
              ctx.lineTo(width, y);  
           
              ctx.fillText(y,5,y);

        } 
        //矮的
        for (var i = 0; i < height/10; i++) {
          const y = i*10;
          if(!y%100==0){
  
            ctx.moveTo(width, y);
            ctx.lineTo(width-width/3, y);  
          }   
       }  
        ctx.stroke(); 
      }
      updateSize=()=>{
        const width = this.refs.container.clientWidth;
        const height = this.refs.container.clientHeight;
        this.setState({width:width,height:height});
      }

      render() {
        const {width,height} = this.state;
        return (
          <div className={styles.container} ref="container">
                <canvas ref='SlideRuler'  ref ="myCanvas" width={width} height={height} className={styles.rulerBox} ></canvas>
          </div>
        );
      }
    }
      

