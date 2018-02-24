import React, { Component } from "react";
import PropTypes from 'prop-types'
import { Modal, Button,Form,Input,Select,Table} from 'antd';
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import { observer } from "mobx-react";
import PotentialError from '../../../potentialError';

import {Tabs} from 'element-react';
import Editor from './editor';
@observer
export default class ColumnEditor extends Component {
  static contextTypes = {
    store:PropTypes.object
  }
  static contextTypes = {
    store:PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
    
      tabIndex: 0,
    }
  }

  addTab() {
    this.context.store.addTableCloumns();
  }
  onTabClick=(tab)=>{
    this.setState({tabIndex: tab.props.name});
  }
  removeTab(tab) {
    const { tabs, tabIndex } = this.state;

    tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
    this.setState({
      tabs,
    });
  }
  render() {  
    const {tabIndex} =this.state;  
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const columns = props.columns;
    let count = 0;
    const children = [];
    columns.forEach((item) => {
      children.push(<Tabs.Pane key={count}  label={item.label} name={count}><Editor index={count}/></Tabs.Pane>)
      count++;
   })
    return (
      <Modal onCancel={this.props.onClose} onOk={this.props.onClose} style={{width:'700',height:'700'}} visible={true} title={"表格属性维护"}>
        <PotentialError>
        <div>
            <div style={{marginBottom: '20px'}}>
              <Button size="small" onClick={() => this.addTab()}>add tab</Button>
            </div>
            <Tabs type="card" value={tabIndex} onTabClick={this.onTabClick}  >
              {
                children
              }
            </Tabs>
          </div>
        </PotentialError>
      </Modal>       
    );
  }
}
