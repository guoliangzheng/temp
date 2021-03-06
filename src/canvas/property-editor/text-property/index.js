import React, { Component } from "react";
import PropTypes from 'prop-types'

import styles from "../index.css";
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import {Width,Left,Top,Height,Binding} from '../base-property';
import {OnFoucs} from '../event-property';
import InputTemplete from '../property-templete/input-templete'
import SelectTemplete from '../property-templete/select-templete'
import EInputTemplete from '../event-templete/input-templete'
import BooleanTemplete from '../property-templete/boolean-templete'

import {Tabs} from 'element-react';

export default class TextProperty extends Component {
  static contextTypes = {
    store:PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { currentElement: null };
  }

  renderProperty=()=>{
    
    return <div  style={{width:'100%', height:800,overflow:'auto'}}>
              <Left/>
              <Top/>
               <Width/>
               <SelectTemplete propertyName="type" propertyLabel="类型" data={{'text':'单行文本','textarea':'多行文本'}}/>
               <InputTemplete propertyName="maxLength" propertyLabel="最大输入长度"/>
               <InputTemplete propertyName="minLength" propertyLabel="最小输入长度"/>
               <InputTemplete propertyName="placeholder" propertyLabel="输入框占位文本"/>
               <BooleanTemplete propertyName="disabled" propertyLabel="禁用" data={{true:"true",false:"false"}}/>
               <SelectTemplete propertyName="size" propertyLabel="输入框尺寸" data={{'large':'large','small':'small',"mini":'mini'}}/>
               <InputTemplete propertyName="rows" propertyLabel="输入框行数	"/>
               <BooleanTemplete propertyName="readOnly" propertyLabel="是否只读" data={{true:"true",false:"false"}}/>
               <SelectTemplete propertyName="resize" propertyLabel="控制是否能被用户缩放"  data={{"none":"none","both":"both","horizontal":"horizontal",vertical:"vertical"}}/>
               <InputTemplete propertyName="prepend" propertyLabel="输入框前置内容"/>
               <InputTemplete propertyName="append" propertyLabel="输入框后置内容"/>
           </div>
  }
  renderEvent=()=>{
    return <div>
            <EInputTemplete eventName='focus' eventLabel='focus事件' />
            <EInputTemplete eventName='blur' eventLabel='blur事件' />
            <EInputTemplete eventName='change' eventLabel='change事件' />
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
