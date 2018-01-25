import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class TableColumn extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "columns";
  }  
  handleChange = (ev) => {
    const value = ev.target.value;
    try{
        let result = JSON.parse(value);
        this.updateStore(result);
    }catch(e){

    }
  }
  updateStore(updatedValue = 0) {
        const { currentComponents } = this.context.store;
        const { columns } = currentComponents.props;
    
        this.context.store.updateElementProps({ columns: updatedValue });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const columns = props.columns;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>列信息</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={JSON.stringify(columns)} onChange={this.handleChange}/>
                </div>
            </div>
        )
    }

}

