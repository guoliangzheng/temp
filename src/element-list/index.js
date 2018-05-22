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
      isfold: false
    };
  }

 
  OnFold =()=>{
    const {fold} = this.props;
    this.setState({isfold:true})
    debugger;
    fold();
  }
  onSpread=()=>{
    const {spread} = this.props;
    this.setState({isfold:false});
    spread();
  }



  render() {
    const {isfold} = this.state;
    return (
      <div className={styles.content}>
        <section className={styles.section}>
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
        </section>
        <div className={styles.bottom +" "+(!isfold?'':styles.vertical)  }>
            <ul className={styles.buttonGroup}>
              <li>
                <a> 教程</a>
              </li>
              <li>
               <a> 快捷键</a>
              </li>
              {!isfold?'':
                <li>
                <a onClick={this.onSpread}>展开</a>
                </li>
              }
            </ul>
           {isfold?'':<a title="" data-original-title="收起" onClick={this.OnFold}>收起</a>}
        </div>
      </div>
    );
  }
}

export default ElementList;
