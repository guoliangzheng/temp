import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class Binding extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "binding";
  }  
  handleChange = (ev) => {
    const value = ev.target.value;
    try{
        this.updateStore(value);
    }catch(e){
       console.log("e",e)
    }
  }
  updateStore(updatedValue) {
        this.context.store.updateElementProps({binding: updatedValue });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const binding = props.binding;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>绑定数据集</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={binding} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }

}

