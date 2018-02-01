import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import { findDOMNode } from "react-dom";

import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../constants";
import { Tree } from 'antd';
import NodeInfo from './nodeinfo'

const TreeNode = Tree.TreeNode;
const boxTarget = {
	drop(props,monitor) {
    console.log("monitor",monitor)
    return { id: props.index}
	},
}

@observer
class ComponentTreeNode extends Component {
  
  static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
  }
   
  static contextTypes = {
    store: PropTypes.object
  };

 
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const props =this.props;
    const { canDrop, isOver, connectDropTarget } = this.props;

    return (

      <li onClick={this.click} {...props}><span className="ant-tree-switcher ant-tree-switcher_open"></span>
        <span title="slide" className="ant-tree-node-content-wrapper ant-tree-node-content-wrapper-open">
       <NodeInfo {...props}/> 
          {this.props.children}
        </span>
      </li>

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

export default ComponentTreeNode;
