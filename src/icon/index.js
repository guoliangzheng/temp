import React, { Component} from "react";
import { IconTypes } from "../constants";
import styles from "./index.css";
import PropTypes from 'prop-types'
class Icon extends Component {


  render() {
    const { path } = this.props;
    return (
      <span
        className={styles.icon}
        {...rest}
        dangerouslySetInnerHTML={{ __html: iconTypeMap[name] }}
      />
    );
  }
}

export default Icon;
