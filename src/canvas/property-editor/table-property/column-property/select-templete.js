import React, { Component } from "react";
import PropTypes, { instanceOf } from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
import { Select } from 'antd';
const Option = Select.Option;

@observer
export default class SelectTemplete extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
  }
  handleChange = (value) => {
      this.updateStore(value);
  }
  updateStore(updatedValue) {
    const data={};
    data[this.props.propertyName] =updatedValue;    
    this.context.store.updateTableCloumns(data,this.props.index);
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const columns = currentElement.props.columns;
    const index = this.props.index;
    const value = columns[index].hasOwnProperty(this.props.propertyName)?columns[index][this.props.propertyName]:"";
    const data =this.props.data;
    const children = [];
    for (let key in data) {
        children.push(<Option key= {key}>{data[key]}</Option>);
    }
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.propertyLabel}</label>
                <div >
                    <Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
                       {children}
                   </Select>
                </div>
            </div>
        )
    }
}

