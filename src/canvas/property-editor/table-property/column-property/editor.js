import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import { observer } from "mobx-react";
import InputTemplete from "./input-templete";
import SelectTemplete from './select-templete';
import {Tabs} from 'element-react';
export default class ColumnEditor extends Component {
  static contextTypes = {
    store:PropTypes.object
  }
  render() {
    return (
      <div>
        <InputTemplete index={this.props.index} propertyName="label" propertyLabel="显示的标题"/ >
        <SelectTemplete index={this.props.index} propertyName="type" propertyLabel="控制是否能被用户缩放"  data={{"selection":"selection","index":"index","expand":"expand"}}/>  
        <InputTemplete index={this.props.index} propertyName="prop" propertyLabel="对应列内容的字段名"  />        
        <InputTemplete index={this.props.index} propertyName="width" propertyLabel="对应列的宽度" />        
        <InputTemplete index={this.props.index} propertyName="minWidth" propertyLabel="对应列的最小宽度"  />        
        <SelectTemplete index={this.props.index} propertyName="fixed" propertyLabel="列是否固定在左侧或者右侧" data={{"left":"left","index":"index","expand":"expand"}}/>
        <SelectTemplete index={this.props.index} propertyName="align" propertyLabel="对齐方式" data={{"left":"left","center":"center","right":"right"}}/>
        <SelectTemplete index={this.props.index} propertyName="headerAlign" propertyLabel="表头对齐方式" data={{"left":"left","center":"center","right":"right"}}/>
      </div>
    )
  }
}  