import React, { Component } from "react";
import PropTypes from 'prop-types';

import styles from "./index.css";

class Arrange extends Component {
  static propTypes = {
    scale: PropTypes.number,
    height: PropTypes.number,
    width: PropTypes.number
  };

  static contextTypes = {
    store: PropTypes.object
  };

  onClickFront = () => {
    this.context.store.setCurrentElementToFrontOrBack(true);
  }

  onClickForward = () => {
    this.context.store.incrementCurrentElementIndexBy(1);
  }

  onClickBackward = () => {
    this.context.store.incrementCurrentElementIndexBy(-1);
  }

  onClickBack = () => {
    this.context.store.setCurrentElementToFrontOrBack();
  }

  onMouseDown = (e) => {
    e.stopPropagation(); // prevent event from propagating out
  }

  render() {
    const scale = 1 / this.props.scale;

    const containerStyles = {
      transform: `translate(-50%, ${-15 * scale}px) scale(${scale})`,
      transformOrigin: "bottom",
      bottom: `100%`,
      left: `50%`
    };

    return (
      <div
        className={styles.arrangeContainer}
        style={containerStyles}
        onMouseDown={this.onMouseDown}
      >
     
      </div>
    );
  }
}

export default Arrange;
