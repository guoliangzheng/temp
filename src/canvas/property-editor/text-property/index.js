import React, { Component } from "react";
import PropTypes from 'prop-types'

import styles from "../index.css";
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import {Width,Height,Binding} from '../base-property';
import {OnFoucs} from '../event-property';

import InputTemplete from '../property-templete/input-templete'
import SelectTemplete from '../property-templete/select-templete'

import {Tabs} from 'element-react';

export default class TextProperty extends Component {
  static contextTypes = {
    store:PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { currentElement: null };
  }

  renderProperty(){
    
    return <div>
               <SelectTemplete propertyName="type" propertyLabel="类型" data={{'text':'单行文本','textarea':'多行文本'}}/>
               <InputTemplete propertyName="value" propertyLabel="绑定值"/>
               <InputTemplete propertyName="maxLength" propertyLabel="最大输入长度"/>
               <InputTemplete propertyName="minLength" propertyLabel="最小输入长度"/>
               <InputTemplete propertyName="placeholder" propertyLabel="输入框占位文本"/>
               <SelectTemplete propertyName="size" propertyLabel="输入框尺寸" data={{'large':'large','small':'small',"mini":'mini'}}/>
               <InputTemplete propertyName="rows" propertyLabel="输入框行数	"/>
               <SelectTemplete propertyName="readOnly" propertyLabel="是否只读" data={{true:"true",false:"false"}}/>

          
           </div>
  }
  render() {    
    return (
      <div>
         <Tabs activeName="1" >
          <Tabs.Pane label="属性管理" name="1">{this.renderProperty()}</Tabs.Pane>
          <Tabs.Pane label="事件管理" name="2">事件管理</Tabs.Pane>
          <Tabs.Pane label="数据集绑定" name="3">数据集绑定</Tabs.Pane>
        </Tabs>
      </div>
    );
  }
}
