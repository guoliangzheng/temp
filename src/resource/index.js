import React, { Component } from 'react';
import {Tree} from 'element-react';
import { observer } from "mobx-react";
import PropTypes, { element } from 'prop-types';

@observer
class Resource extends Component {
  static contextTypes = {
    resouceStore: PropTypes.object
  }; 
  constructor(props) {
    super(props)
    this.options = {
      label: 'name',
      children: 'children'
    }
    this.count = 1
  
  }
  
  handleCheckChange(data, checked, indeterminate) {
    console.log(data, checked, indeterminate);
  }
  
  loadNode(node, resolve) {
    
  }
  
  render() {
    const {tree} = this.context.resouceStore;
    console.log(tree);
    return (
      <Tree
        data={tree}
        options={this.options}
        isShowCheckbox={false}
        lazy={false}
        load={this.loadNode.bind(this)}
        onNodeClicked={(data, nodeModel, reactElement, treeNode)=>{
          this.context.resouceStore.setSelectResouce(data.id);
          console.log('onNodeClicked: ', data, nodeModel, reactElement)
        }}
      />
    )
  }
}
export default Resource;


