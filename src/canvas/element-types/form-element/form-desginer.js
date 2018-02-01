import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import {ElementTypes} from "../../../constants";
import UUID from "../../../util/uuid"
const FormItem = Form.Item;
const Option = Select.Option;

@observer
export default class FormDesginer extends Component {
  static contextTypes = {
    store:PropTypes.object
  }

  componentWillMount(){
    const id = this.props.id;
    const component = this.context.store.getComponentByid(id);
    let store = this.context.store;
    if(component==null) return ;
    let list = [];
    const children = component.children;
    if(!children) return;
    children.map((idx)=>{
        const temp = store.getComponentByid(idx);
        const {label,id} = temp.props
        let type =""; 
        if(temp.children && temp.children.lenght>0 ){
            type = temp.children[0].type;
        }
        list.push({key:id,label,type})
    })
    this.setState ({list:list}); 
  }
  addItem =(e)=>{
    let list =this.state.list;
    const item = {key:UUID(),label:'text',type:ElementTypes.TEXT} 
    list.push(item)
    this.context.store.addFromItem(this.props.id,item);
    this.setState({list:list});
  }
  render() {
     
    const columns = [{
      title: 'label',
      dataIndex: 'label',
      key: 'label',
    }, {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    }];
    return (
      <Modal onCancel={this.props.onClose} onOk={this.props.onClose} style={{width:'700',height:'700'}} visible={true} title={"表单字段维护"}>         
          <Form layout="inline" >
         <FormItem   label="label"> <Input />
         </FormItem>
         <FormItem  label="类型" > 
                <Select  >
                <Option key="" value=""></Option>
                </Select>
         </FormItem>
         <FormItem >
            <Button onClick={this.addItem} >添加</Button> 
         </FormItem >         
        </Form>
        <Table  pagination={false} style={{width:400,height:400}} columns={columns} dataSource={this.state.list}  />
      </Modal>       
    );
  }
}