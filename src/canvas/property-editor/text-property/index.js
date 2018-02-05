import React, { Component } from "react";
import PropTypes from 'prop-types'

import styles from "../index.css";
import { map, omit, find } from "lodash";
import { DatePicker } from 'antd';
import {Width,Height} from '../base-property';
import {OnFoucs} from '../event-property';


export default class TextProperty extends Component {
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
        <OnFoucs/>
        <Width/>
        <Height/>
      </div>
    );
  }
}
