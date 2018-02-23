import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./index.css";

export default class HRuler extends Component {

     constructor(props){
         super(props);
     }
      componentDidMount(){
        this.initCanvas(this.props);
      }
    
     
      initCanvas(data){
        new this.Promise((resolve, reject)=>{
           this.drawRuler();
        })
      }
    
    
      drawRuler(){
        var myCanvas = this.refs.myCanvas;
        console.log('canvas',myCanvas);
        var c = myCanvas.getContext("2d");
        console.log('c',c);

      /*   c.clearRect(0, 0, w, h);
			
			
        var max = parseInt(document.f.max.value);
         
        var min = parseInt(document.f.min.value);
     
        var ratio = (max - min) / w;
    
        var tickSize = 50;
    
        var tickCnt = Math.ceil(w / tickSize);
    
        var unit = tickSize * ratio;
    
    
        c.moveTo(0,  50);
        c.lineTo(w,  50);
    
        for (var i = 0; i < tickCnt; i++) {
            c.moveTo(0 + tickSize * i, 50);
            c.lineTo(0 + tickSize * i,  60);
            c.textAlign = 'center';
            c.fillText((min + unit * i).toFixed(2), 0 + tickSize * i,  70);
            //console.log(min + unit * i);
        }
        c.stroke(); */
      }
    
     
      render() {
        return (
          <div className={styles.container}>
                <canvas ref='SlideRuler'  ref ="myCanvas" className={styles.rulerBox} style={{width:'100%',height:'100%'}} ></canvas>
          </div>
        );
      }
    }
    

