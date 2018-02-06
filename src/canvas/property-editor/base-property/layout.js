import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
import { Select } from 'antd';
const Option = Select.Option;

@observer
export default class Layout extends Component {

  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "layout";
  }
  handleChange = (value) => {
    this.updateStore(value);
  }
  updateStore(updatedValue = "outline") {
        this.context.store.updateElementProps({ "layout": updatedValue });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const style = props.style;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>布局</label>
                <div>
                <Select defaultValue="outline" style={{ width: 120 }} onChange={this.handleChange}>
                        <Option value="inline">inline</Option>
                        <Option value="outline">outline</Option>    
                </Select>
                </div>
            </div>
        )
    }
}

