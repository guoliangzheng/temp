import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class ComCobxData extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "data";
  }  
  handleChange = (ev) => {
    const value = ev.target.value;
    try{
        let result = JSON.parse(value);
        this.updateStore(result);
    }catch(e){

    }
  }
  updateStore(updatedValue) {
        this.context.store.updateElementProps({ data: updatedValue });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const data = props.data;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>数据源</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={JSON.stringify(data)} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }

}

