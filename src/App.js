

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
import ResoucreStore from './resource/resouceStore'
import 'element-theme-default';
import Desginer from './Desginer';
import Resoucre from './resource'

import ResourceProvider from './ResourceProvider';

require('codemirror/lib/codemirror.css');
class App extends Component {
  render() {
    let store = new  ResoucreStore();
    return (
      <ResourceProvider store={store}>
          <div style={{display:'flex',width:'100%',height:'100%'}}>
              <div style={{height:'100%',width:200}}><Resoucre/></div>
              <div className={styles.editor} style={{height:'100%',width:'calc(100%-200px)'}}><Desginer/></div>
          </div>
      </ResourceProvider>
    );
  }
}
export default App;
