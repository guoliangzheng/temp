import React, { Component } from "react";
import PropTypes from 'prop-types'

import styles from "../index.css";
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import {Width,Height,TableColumn,TableDataSource,Binding} from '../base-property';
import {Tabs} from 'element-react';
import InputTemplete from '../property-templete/input-templete'
import SelectTemplete from '../property-templete/select-templete'
import EInputTemplete from '../event-templete/input-templete'
import BooleanTemplete from '../property-templete/boolean-templete'

import ColumnEditor from './column-property/index'

export default class TableProperty extends Component {
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(props) {
    super(props);
    this.state={
      isedit:false
    }  }
  renderProperty=()=>{
    
    return <div>
               <Width/>
               <Height/>
               <BooleanTemplete propertyName="stripe" propertyLabel="是否斑马纹"/>
               <BooleanTemplete propertyName="border" propertyLabel="是否带有纵向边框"/>
               <BooleanTemplete propertyName="fit" propertyLabel="列的宽度是否自撑开"/>
               <BooleanTemplete propertyName="showHeader" propertyLabel="是否显示表头"/>
               <BooleanTemplete propertyName="highlightCurrentRow" propertyLabel="是否要高亮当前行"/>
               <InputTemplete propertyName="emptyText" propertyLabel="空数据时显示的文本内容"/>
               <BooleanTemplete propertyName="defaultExpandAll" propertyLabel="是否默认展开所有行"/>
               <BooleanTemplete propertyName="showSummary" propertyLabel="是否在表尾显示合计行"/>
               <InputTemplete propertyName="sumText" propertyLabel="合计行第一列的文本"/>
               <div>
                <label >表格列设置  <a href="#" onClick={this.openEditor}>编辑</a></label>
               </div>
{/*            <FunctionTemplete propertyName="summeryMethod" propertyLabel="自定义的合计计算方法"/>
 */}
           </div>
  }
  renderEvent=()=>{

    return <div>
         {/*    <EInputTemplete eventName='focus' eventLabel='focus事件' />
           */}
           </div>
  }
  renderBinding=()=>{
     return   <Binding/>
  }
  openEditor=()=>{
    this.setState({isedit:true})
  }
  closeEditor=()=>{
    this.setState({isedit:false})
  }
 
  render() {    
    return (
      <div>
         <Tabs activeName="1" >
          <Tabs.Pane label="属性管理" name="1">{this.renderProperty()}</Tabs.Pane>
          <Tabs.Pane label="事件管理" name="2">{this.renderEvent()}</Tabs.Pane>
          <Tabs.Pane label="数据集绑定" name="3">{this.renderBinding()}</Tabs.Pane>
          </Tabs>
          {this.state.isedit?<ColumnEditor  onClose={this.closeEditor}/>:""}
      </div>
    );
  }
}
