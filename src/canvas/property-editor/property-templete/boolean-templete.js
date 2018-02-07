import React, { Component } from "react";
import PropTypes, { instanceOf } from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
import { Select } from 'antd';
const Option = Select.Option;

@observer
export default class BooleanTemplete extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
  }
  handleChange = (value) => {
    let result = true;

    if(value=="true"){
          result =true;
      }else{
          result =false
      }
      console.log("change",result,typeof(result))

      this.updateStore(result);
  }
  updateStore(updatedValue) {
     const data={};
     data[this.props.propertyName] =updatedValue;     
    this.context.store.updateElementProps(data);
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    let value = props[this.props.propertyName];
    console.log("value",value,typeof(value))
    value = value+"";
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.propertyLabel}</label>
                <div >
                    <Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
                    <Option key= {true}>true</Option>
                    <Option key= {false}>false</Option>
                   </Select>
                </div>
            </div>
        )
    }
}

