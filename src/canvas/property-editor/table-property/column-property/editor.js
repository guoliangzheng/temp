import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import { observer } from "mobx-react";

import {Tabs} from 'element-react';
@observer
export default class ColumnEditor extends Component {
  static contextTypes = {
    store:PropTypes.object
  }
  static contextTypes = {
    store:PropTypes.object
  }

  render() {    
    return (
      <Modal onCancel={this.props.onClose} onOk={this.props.onClose} style={{width:'700',height:'700'}} visible={true} title={"表格属性维护"}>
          

      </Modal>       
    );
  }
}
