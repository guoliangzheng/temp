import React, { Component } from "react";
import PropTypes from 'prop-types';
import styles from "./index.css";
import {MdSave,MdUndo,MdRedo,MdDelete,MdFormatAlignCenter,MdFormatAlignJustify,MdFormatAlignLeft,MdFormatAlignRight,MdDone} from 'react-icons/lib/md'

export default class ToolBars extends Component {

    render(){
        return  (
             <div>
                <div className={styles.left}>
                </div>
                <div className={styles.center}>
                    <a className={styles.aStyle}> 
                       <MdSave/>
                      <span type="tip">保存</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdUndo/>
                      <span type="tip">撤销</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdRedo/>
                      <span type="tip">恢复</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdDelete/>
                      <span type="tip">删除</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdFormatAlignLeft/>
                      <span type="tip">左对齐</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdFormatAlignCenter/>
                      <span type="tip">居中</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdFormatAlignRight/>
                      <span type="tip">右对齐</span>
                    </a>
                    <a className={styles.aStyle}>
                      <MdDone/>
                      <span type="tip">执行</span>
                    </a>
                </div>
                <div className={styles.right}>
              
                </div>
            </div>
        )

    }
}