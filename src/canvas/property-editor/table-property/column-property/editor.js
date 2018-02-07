import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import { observer } from "mobx-react";
import InputElement from "./input-templete";
import {Tabs} from 'element-react';
export default class ColumnEditor extends Component {
  static contextTypes = {
    store:PropTypes.object
  }


  render() {
    return (
      <div>
        <InputElement index={this.props.index} propertyName="label" propertyLabel="显示的标题"/ >        
      </div>
    )
  }
}  