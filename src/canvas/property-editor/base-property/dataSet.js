


import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { Button,Form,Input,Select,Table} from 'antd';
import { observer } from "mobx-react";
const FormItem = Form.Item;
const Option = Select.Option;

@observer
class DataSetFrom extends Component {
      
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
          const {name,type,describe,data}= values;
          const temp = {};
          temp.name = name;
          temp.type = type;
          if(type=="object"){
            temp.data = new Object(data);
          }
          if(type=="array"){
            temp.data = new Array(data);
          }
          if(type=="boolean"){
            temp.data = new Boolean(data);
          }
          if(type=="string"){
            temp.data = new String(data);
          }
          if(type=="number"){
            temp.data = new Number(data);
          }
          temp.describe = describe;
          this.context.store.addDataSet(temp)
          }catch(e){alert('数据集定义不正确')}
        }
      });
  }
  render(){
    const dataSet = this.context.store.dataSet;
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const tableData = [];
    dataSet.forEach(element=>{ 
      const {name,describe} = element;
      tableData.push({
        name,
        describe
      })
    });
    const columns = [{
      title: '数据集名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '数据集描述',
      dataIndex: 'describe',
      key: 'describe',
    }];
  
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>数据集定义</label>
                <br/>
                <Table dataSource={tableData} columns={columns} />
                <Form layout="inline" onSubmit={this.handleAdd}>
                <FormItem label="数据集"
              >
                {getFieldDecorator('name', {
                  rules: [{ required: false }],
                })(
                  <Input  />
                )}
              </FormItem>
              <FormItem label="描述"
              >
                {getFieldDecorator('describe', {
                  rules: [{ required: false }],
                })(
                  <Input  />
                )}
              </FormItem>
              <FormItem label="数据集类型"
              >
                {getFieldDecorator('type', {
                  rules: [{ required: false }],
                })(
                  <Select defaultValue="object"  >
                  <Option value="object">object</Option>
                  <Option value="array">array</Option>
                  <Option value="boolean">boolean</Option>
                  <Option value="string">string</Option>
                  <Option value="number">number</Option>
                </Select>
                )}
              </FormItem>  

              <FormItem label="数据"
              >
                {getFieldDecorator('data', {
                  rules: [{ required: false }],
                })(
                  <Input   />
                )}
              </FormItem>  
              <FormItem>
                <Button
                    type="primary"
                    onClick={this.handleAdd}
                >
                添加
                </Button>
                </FormItem>
                </Form>                  
            </div>
        )
    }
}
const DataSet = Form.create()(DataSetFrom);
export default DataSet

