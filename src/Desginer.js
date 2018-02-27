

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

@observer
class Desginer extends Component {

  static contextTypes = {
    resouceStore: PropTypes.object
  }; 
  render() {
    const selectResouce = this.context.resouceStore.selectResouce;
    let store = new Store(selectResouce);
    return ( 
      <div selectID ={selectResouce} style={{width:'100%',height:'100%'}}>
         <DragDropContextProvider backend={HTML5Backend}>
          <Provider store={store}>
            <Canvas></Canvas>
          </Provider>
        </DragDropContextProvider>
      </div>
    );
  }
}
export default Desginer;
