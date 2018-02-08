import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import JsParse from '../base-property/jsParse';

@observer
export default class CodeTemplete extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(props){
     super(props)
     this.state={
        action:this.props.action
     }
  }
  handleNameChange = (ev) => {
    const value = ev.target.value;
    //this.updateStore(value);
    const {action} =this.state;
    action.name = value;
    this.setState({action:action});
  }
  handleDescribeChange = (ev) => {
    const value = ev.target.value;
    const {action} =this.state;
    action.describe = value;
    this.setState({action:action});
    //this.updateStore(value);
  }
  handleParamterChange = (ev) => {
    const value = ev.target.value;
    const {action} =this.state;
    action.paramters = value;
    this.setState({action:action});
    //this.updateStore(value);
  }
  updateCode=(value)=>{
    const {action} =this.state;
    action.body = value;
    this.setState({action:action});
  }
  
  onOk=()=>{
    const action = this.state.action;
    const {paramters,body} =this.state.action;
    try{
      let func = new Function(paramters,JsParse(body).join(''));
      action.action = func;
    }catch(e){
      alert("函数定义错误")
      alert(e);
      return;
    }

    this.props.getAction(action);

  }
  render(){
    
    var CodeMirror = require('react-codemirror');
    var options = {
        lineNumbers: true,
        mode: 'javascript',
    }
    const {name,describe,body,paramters} = this.state.action;
    return (
        <Modal onCancel={this.props.onClose} onOk={this.onOk} style={{width:'700',height:'700'}} visible={true} title={"代码编辑"}>
{/* 
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.propertyLabel}</label> */}
              <div>
               <label className={styles.controlLable}>函数名</label>
               <input className={styles.propertyControl} type="text" value={name} onChange={this.handleNameChange}/>
              </div>
              <div>
                <label className={styles.controlLable}>描述</label>
                <input className={styles.propertyControl} type="text" value={describe} onChange={this.handleDescribeChange}/>
              </div>
              <div>
               <label className={styles.controlLable}>参数</label>
               function(<input className={styles.propertyControl} type="text" value={paramters} onChange={this.handleParamterChange}/>)
              </div>
               <CodeMirror value={body} onChange={this.updateCode} options={options} />
{/*             </div>
 */}         </Modal>
        )
    }
}

