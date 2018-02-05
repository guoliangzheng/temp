import React, { Component } from "react";
import PropTypes from 'prop-types'


import {Actions} from '../base-property';

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
      </div>
    );
  }
}
