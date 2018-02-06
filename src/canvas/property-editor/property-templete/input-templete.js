import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class InputTemplete extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
  }
  handleChange = (ev) => {
    const value = ev.target.value;
    this.updateStore(value);
  }
  updateStore(updatedValue) {
    const data={};
    data[this.props.propertyName] =updatedValue;    
    this.context.store.updateElementProps(data);
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const value = props[this.props.propertyName];
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>{this.props.propertyLabel}</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={value} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }
}

