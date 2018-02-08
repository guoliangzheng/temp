import React, { Component } from "react";
import PropTypes from 'prop-types'
import EInputTemplete from '../event-templete/input-templete'
import {Actions,DataSet} from '../base-property';

export default class SlideProperty extends Component {
  static contextTypes = {
    store:PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = { currentElement: null };
  }

 
  render() {    
    return (
      <div>
       <Actions/>
       <DataSet/>
       <EInputTemplete eventName='init' eventLabel='init事件' />
      </div>
    );
  }
}
