import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { Select } from 'antd';
import { observer } from "mobx-react";
import CodeTemplete from './code-templete'

const Option = Select.Option;

@observer
export default class InputTemplete extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.state ={
      isedit:false
     }
  }
 /*  handleChange = (value) => {
    this.updateStore(value);
  }
  updateStore(updatedValue) {
    const data={};
    data[this.props.eventName] =updatedValue;    
    this.context.store.updateElementEvent(data);
    
  } */
  openEditor=()=>{
    this.setState({isedit:true})
  }
  closeEditor=()=>{
    this.setState({isedit:false})
  }

  getAction =(action)=>{
    this.context.store.bindingActionOnEvent(action,this.props.eventName);
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const event = currentElement.event;
    const value = event[this.props.eventName];
    const actions = this.context.store.actions;
    const action = actions.has(value)?actions.get(value): new Object({name:'',describe:'',body:'',paramters:''});

  /*
    const children = [];

    actions.forEach(element => {
        const {name} = element;
        children.push(<Option key= {name}>{name}</Option>);
    }); */
    return (
        
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.eventLabel}</label>
                <a href="#" onClick={this.openEditor}>点击</a>
                {this.state.isedit?  <CodeTemplete getAction={this.getAction} action={action} onClose={this.closeEditor}/>:""}
                  {/*   <Select defaultValue={value} style={{ width: 120 }} onChange={this.handleChange}>
                       {children}
                   </Select> */} 
            </div>
        )
    }
}

