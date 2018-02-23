import React, { Component } from "react";
import PropTypes from 'prop-types';

import ElementItem from "./element-item";
import styles from "./index.css";
import { ElementTypes } from "../constants";
const elements = [
                    {type:ElementTypes.BUTTON,label:'按钮'},
                    {type:ElementTypes.TEXT,label:'文本框'},
                    {type:ElementTypes.IMAGE,label:'图形'},
                    {type:ElementTypes.TABLE,label:'表格'},
                    {type:ElementTypes.LIST,label:'列表'},
                    {type:ElementTypes.FORM,label:'表单'},
                    {type:ElementTypes.FORMIITEM,label:'表单项'},
                    {type:ElementTypes.COXCOMB,label:'南丁格尔图'}
                  ];
const elementWidth = 60;
const elementMarginRight = 25;
const wrapperWidth = elements.length * (elementWidth + elementMarginRight) - elementMarginRight;


class ElementList extends Component {
  static propTypes = {
    scale: PropTypes.number
  };

  constructor(props) {
    super(props);

    this.state = {
      listLeft: 350
    };
  }

  componentDidMount = () => {
    this.resize();
    window.addEventListener("load", this.resize);
    window.addEventListener("resize", this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener("load", this.resize);
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    const clientWidth = document.body.clientWidth;

    const listLeft = (clientWidth - wrapperWidth) / 2;

    this.setState({
      listLeft
    });
  }

  render() {
    return (
      <div className={styles.content}>
        <ul className={styles.list}>
        {elements.map((element, i) => (
          <ElementItem
            key={element.type}
            element = {element}
            elementType={element.type}
            {...this.props}
          />
        ))}
        </ul>
      </div>
    );
  }
}

export default ElementList;
