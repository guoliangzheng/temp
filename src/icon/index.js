import React, { Component} from "react";
import { IconTypes } from "../constants";
import styles from "./index.css";
import PropTypes from 'prop-types'
import ReactSVG from 'react-svg'
import {ElementTypes} from '../constants'
const svgMap = new Map();
svgMap.set(ElementTypes.BUTTON,"../assert/svg/button.svg");
svgMap.set(ElementTypes.FORM,"../assert/svg/form.svg");
svgMap.set(ElementTypes.IMAGE,"../assert/svg/image.svg");
svgMap.set(ElementTypes.TABLE,"../assert/svg/table.svg");
svgMap.set(ElementTypes.LIST,"../assert/svg/list.svg");
svgMap.set(ElementTypes.TEXT,"../assert/svg/input.svg");
svgMap.set(ElementTypes.COXCOMB,"../assert/svg/coxcomb.svg");

class Icon extends Component {


  render() {
    const { type } = this.props;
    return (
      <ReactSVG
         style={{width: 20,height:20}}
        path= {svgMap.get(type)}
     />
    );
  }
}

export default Icon;
