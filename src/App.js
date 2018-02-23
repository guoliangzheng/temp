

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
require('codemirror/lib/codemirror.css');
let store = new Store();
class App extends Component {
  render() {
    return (
      <div style={{width:'100%',height:'100%'}}>
         <DragDropContextProvider backend={HTML5Backend}>
          <Provider store={store}>
            <Canvas></Canvas>
          </Provider>
        </DragDropContextProvider>
      </div>
    );
  }
}
export default App;
