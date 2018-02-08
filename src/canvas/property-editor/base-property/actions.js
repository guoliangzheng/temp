


import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { Button,Form,Input,Select,Table} from 'antd';
import { observer } from "mobx-react";
import JsParse from './jsParse';
const { TextArea } = Input;

const FormItem = Form.Item;
@observer
class ActionFrom extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "actions";
  }  
  componentDidMount() {
     this.props.form.validateFields();
  }
  updateStore(updatedValue = 0) {
      
  }
  renderAction = (element)=>{
      
    const {name} = element;
    console.log("name",name);

    return (<div>{name}</div>)
  }
  handleAdd = ()=>{
    this.props.form.validateFields((err, values) => {
        if (!err) {
          try{
          const {name,action,describe}= values;
          const temp = {};
          temp.name = name;
          temp.source = action;
          temp.describe = describe;
          console.log("function",JsParse(action).join(''));
          temp.action = new Function(JsParse(action).join(''));
          this.context.store.addAction(temp)
          }catch(e){
            console.error("method",e);
            alert('函数定义不正确')}
        }
      });
  }
  render(){
    const actions = this.context.store.actions;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const tableData = [];
    actions.forEach(element=>{ 

      const {name,describe} = element;
      tableData.push({
        name,
        describe
      })
    });
    const columns = [{
      title: '事件名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '事件描述',
      dataIndex: 'describe',
      key: 'describe',
    }];
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>动作定义</label>
                <Table dataSource={tableData} columns={columns} />
            </div>
        )
    }
}

const Actions = Form.create()(ActionFrom);
export default Actions

