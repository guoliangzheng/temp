import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { findDOMNode } from "react-dom";

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";
import { Tree } from 'antd';
import { DropTarget } from 'react-dnd'
const TreeNode = Tree.TreeNode;
const boxTarget = {
	drop(props,monitor) {
    console.log("monitor",monitor)
    return { id: props.index}
	},
}
@DropTarget("element-types", boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
}))
@observer
class NodeInfo extends Component {
  
  static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
  }
   
  static contextTypes = {
    store: PropTypes.object
  };

  onClick =()=>{
    this.context.store.setCurrentElement(this.props.index);
  }
  constructor(props, context) {
    super(props, context);
  }
 

  render() {
    const props =this.props;
    const { canDrop, isOver, connectDropTarget } = this.props;

    return connectDropTarget(
        <span onClick={this.onClick} className="ant-tree-title" {...props}>{this.props.title}</span>
/* 
      <li {...props}><span className="ant-tree-switcher ant-tree-switcher_open"></span>
        <span title="slide" className="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open">
        <span className="ant-tree-title">{this.props.title}</span>
          {this.props.children}
        </span>
      </li>
 */
         /*  <li {...props}> {this.props.title}
            {this.props.children}
          </li> */
         
         /*   <TreeNode  {...props} ref={instance => {
             try{
            if(!instance) return;
            const node = findDOMNode(instance);
            if(!node) return; 
            connectDropTarget(node);
             }catch(e){}
          }} >
          {this.props.children}
          </TreeNode>  */
    
    );
  }
}

export default NodeInfo;
