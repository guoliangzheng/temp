import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from './index.css'
import { observer } from "mobx-react";
@observer
export default class OnFoucs extends Component {
      
  static contextTypes = {
    store:PropTypes.object
  }
  constructor(){
     super()
     this.propertyName = "onfocus";
  }  
  handleChange = (ev) => {
    const value = ev.target.value
    this.updateStore(value);
  }
  updateStore(updatedValue) {
    const { currentComponents } = this.context.store;
    const { event } = currentComponents.props;
    const updatedEventProp = {};
    updatedEventProp[this.propertyName] = updatedValue;
    const updatedEvents = { ...event, ...updatedEventProp };
    this.context.store.updateElementProps({ 'event': updatedEvents });
  }
  render(){
    const currentElement = this.context.store.currentComponents;
    const props = currentElement.props;
    const event = props.event;
    return (
            <div className={styles.propertyGroup}>
                <label className={styles.controlLable}>onfoucs</label>
                <div >
                    <input className={styles.propertyControl} type="text" value={event.onfocus} onChange={this.handleChange}
                    />
                </div>
            </div>
        )
    }

}

