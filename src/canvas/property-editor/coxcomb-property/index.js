import React, { Component } from "react";
import PropTypes from 'prop-types'

import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import {Width,Left,Top,Height,Binding} from '../base-property';
import {OnFoucs} from '../event-property';
import InputTemplete from '../property-templete/input-templete'
import SelectTemplete from '../property-templete/select-templete'
import EInputTemplete from '../event-templete/input-templete'
import BooleanTemplete from '../property-templete/boolean-templete'
import {Tabs} from 'element-react';

export default class ComCobxProperty extends Component {
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state = { currentElement: null };
  }


  renderProperty=()=>{
    
    return <div>
              <Left/>
              <Top/>
               <Width/>
               <Height/>
           </div>
  }
  renderEvent=()=>{
    return <div>
         
           </div>
  }
  renderBinding=()=>{
     return   <Binding/>
  }
  render() {    
    return (
      <div>
         <Tabs activeName="1" >
          <Tabs.Pane label="属性管理" name="1">{this.renderProperty()}</Tabs.Pane>
          <Tabs.Pane label="事件管理" name="2">{this.renderEvent()}</Tabs.Pane>
          <Tabs.Pane label="数据集绑定" name="3">{this.renderBinding()}</Tabs.Pane>
        </Tabs>
      </div>
    );
  }
}
