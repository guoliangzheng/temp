import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { Select } from 'antd';
import { observer } from "mobx-react";
const Option = Select.Option;

@observer
export default class Binding extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "binding";
  }  
  handleChange = (value) => {
    try{
        this.updateStore(value);
    }catch(e){
       console.log("e",e)
    }
  }
  updateStore(updatedValue) {
        this.context.store.updateElementBinding(updatedValue);
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const dataSet = this.context.store.dataSet;
    const children = [];

    dataSet.forEach(element => {
        const {name} = element;

        children.push(<Option key= {name}>{name}</Option>);

    });
    const binding = currentElement.binding;
    return (
            <div className={styles.propertyGroup}>
                <div >
                    <Select defaultValue={binding} style={{ width: 120 }} onChange={this.handleChange}>
                       {children}
                   </Select>
                </div>
            </div>
        )
    }

}

