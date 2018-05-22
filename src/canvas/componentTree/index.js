import React, { Component } from "react";
import { observer } from "mobx-react";
import classNames from "classnames";
import PropTypes from 'prop-types';
import styles from './index.css'
import { BLACKLIST_CURRENT_ELEMENT_DESELECT, ElementTypes, MODES } from "../../constants";
import { Tree } from 'antd';
import ComponentTreeNode from './componetTreeNode'
const TreeNode = Tree.TreeNode;

@observer
class ComponentTree extends Component {
  
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);
    this.state ={isfold:false};
  }
  onSelect = (selectedKeys, info) => {
    const {eventKey} = info.node.props;
    this.context.store.setCurrentElement(eventKey);

  }
  OnFold =()=>{
    const {fold} = this.props;
    this.setState({isfold:true})
  }
  onSpread=()=>{
    const {spread} = this.props;
    this.setState({isfold:false});
  }

  renderChild = (id) => {

    const store = this.context.store;
    const isSelected = store.currentElement === id;
    const childObj = store.components.get(id);
    if(!childObj)return;
    return (
        <ComponentTreeNode dataRef={childObj}  index={childObj.id}  title={childObj.type}  key={childObj.id}>
           {childObj.children!=null &&  <ul className="ant-tree" role="tree-node" unselectable="on"> {childObj.children.map(this.renderChild)}</ul> }
        </ComponentTreeNode>
    );
  }

  render() {
     const {store:{components,rootID}} = this.context;
     const {isfold} = this.state;
    if (!components) return null;
    const currentSlide = components.get(rootID);
    return (
     <div  className={styles.content}>
      <section className={styles.section}>
        <ul className="ant-tree" role="tree-node" unselectable="on">
          <ComponentTreeNode dataRef={currentSlide}   title={currentSlide.type} index={currentSlide.id}  key={currentSlide.id}>
            {currentSlide && rootID && currentSlide.children.map(this.renderChild)}
          </ComponentTreeNode> 
      </ul>
      </section>
      <div className={styles.bottom +" "+(!isfold?'':styles.vertical)  }>
      <ul className={styles.buttonGroup}>
        {!isfold?'':
          <li>
          <a onClick={this.onSpread}>展开</a>
          </li>
        }
      </ul>
    {isfold?'':<a title="" data-original-title="收起" onClick={this.OnFold}>收起</a>}
    </div>
    </div>
    );
  }
}

export default ComponentTree;
