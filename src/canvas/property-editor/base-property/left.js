import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class Left extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "left";
  }


  
  handleChange = (ev) => {
    const value = parseInt(ev.target.value.match(/[0-9]*/)[0], 10);
    const result = isNaN(value) ? "" : value;
    this.updateStore(result);
  }
  updateStore(updatedValue = 0) {
        const { currentComponents } = this.context.store;
        const { style } = currentComponents.props;
        const updatedStyleProp = {};

        updatedStyleProp[this.propertyName] = updatedValue;

        const updatedStyles = { ...style, ...updatedStyleProp };

        this.context.store.updateElementProps({ style: updatedStyles });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const style = props.style;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>居左</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={style.left} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }

}

