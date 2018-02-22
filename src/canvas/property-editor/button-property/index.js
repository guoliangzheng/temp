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
    
    return <div>
              <Left/>
              <Top/>
               <Width/>
               <InputTemplete propertyName="label" propertyLabel="label" />
               <SelectTemplete propertyName="size" propertyLabel="尺寸" data={{'large':'large','small':'small',"mini":'mini'}}/>
               <SelectTemplete propertyName="type" propertyLabel="类型" data={{'primary':'primary','success':'success','warning':'warning','danger':'danger','info':'info','text':'text'}} />    
               <BooleanTemplete propertyName="plain" propertyLabel="是否朴素按钮" data={{true:"true",false:"false"}}/>
               <BooleanTemplete propertyName="loading" propertyLabel="是否加载中状态" data={{true:"true",false:"false"}}/>
               <BooleanTemplete propertyName="disabled" propertyLabel="禁用" data={{true:"true",false:"false"}}/>
               <SelectTemplete propertyName="icon" propertyLabel="图标" data={{'edit':'编辑','delete':'删除','search':'搜索','arrow-left':'上一页','arrow-right':'下一页'}} />    
               <SelectTemplete propertyName="nativeType" propertyLabel="原生 type 属性" data={{'edit':'button','submit':'submit','reset':'reset'}} />    
           </div>
  }
  renderEvent=()=>{
    return <div>
            <EInputTemplete eventName='click' eventLabel='click事件' />           
           </div>
  }
  renderBinding=()=>{
     return /*   <Binding/> */<div></div>
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
