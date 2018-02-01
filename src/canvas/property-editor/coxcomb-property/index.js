import React, { Component } from "react";
import PropTypes from 'prop-types'

import {Width,Height,ComCobxData} from '../base-property';
export default class ComCobxProperty extends Component {
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
        <Width/>
        <Height/>
        <ComCobxData/>
      </div>
    );
  }
}
