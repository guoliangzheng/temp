import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./index.css";

export default class HRuler extends Component {

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
        for (var i = 0; i < width/100; i++) {
              const x = i*100;
              ctx.moveTo(x, 0);
              ctx.lineTo(x, height);  
              ctx.fillText(x,x,10);

        } 
        //矮的
        for (var i = 0; i < width/10; i++) {
          const x = i*10;
          if(!x%100==0){
            ctx.moveTo(x, height);
            ctx.lineTo(x, height-height/3);
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
      

