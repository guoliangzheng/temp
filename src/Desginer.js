

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import  Provider from './Provider'
import Canvas from './canvas'
import Store from './store'
import {LeftSide,RightSide} from './side' 
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import styles from "./App.css";
import 'element-theme-default';
import PropTypes, { element } from 'prop-types';
import { observer } from "mobx-react";
require('codemirror/lib/codemirror.css');
//设计器入口
@observer
class Desginer extends Component {

  static contextTypes = {
    resouceStore: PropTypes.object
  }; 
  render() {
    const selectResouce = this.context.resouceStore.selectResouce;
    //初始化状态数据
    let store = new Store(selectResouce);
    return ( 
      <div selectID ={selectResouce} style={{width:'100%',height:'100%'}}>
         {/*用于构造拖拽的上下文*/}
         <DragDropContextProvider backend={HTML5Backend}> 
          {/*用于构造数据状态的上下文*/}
          <Provider store={store}>
            <Canvas></Canvas>
          </Provider>
        </DragDropContextProvider>
      </div>
    );
  }
}
export default Desginer;
