import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { Select } from 'antd';
import { observer } from "mobx-react";
const Option = Select.Option;
@observer
export default class InputTemplete extends Component {
      
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
    data[this.props.eventName] =updatedValue;    
    this.context.store.updateElementEvent(data);
    
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const event = currentElement.event;
    const value = event[this.props.eventName];
    const actions = this.context.store.actions;
    const children = [];

    actions.forEach(element => {
        const {name} = element;
        children.push(<Option key= {name}>{name}</Option>);

    });
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.eventLabel}</label>
                <div >
                    <Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
                       {children}
                   </Select>
                </div>
            </div>
        )
    }
}

