import React, { Component } from "react";
import styles from "./option.css";
import PropTypes from 'prop-types'

export default class Option extends Component {
  static propTypes = {
    value:PropTypes.string.isRequired,
    children:PropTypes.oneOfType([React.PropTypes.node,PropTypes.string]).isRequired,
    onClick:PropTypes.func,
    onKeyDown:PropTypes.func,
    automationId:PropTypes.string,
    style:PropTypes.object,
    className:PropTypes.string,
    hoverClassName:PropTypes.string,
    activeClassName:PropTypes.string,
    isActive:PropTypes.bool
  }

  static defaultProps = {
    value: "",
    automationId: undefined,
    className: `${styles.option}`,
    activeClassName: "active",
    hoverClassName: `${styles.hover}`,
    onClick() {}
  }

  constructor(props) {
    super(props);

    this.displayName = "RadonSelectOption";
    this.state = {
      hovered: false
    };
  }

  getClassNames() {
    const classNames = [this.props.className];

    if (this.props.isActive) {
      classNames.push(this.props.activeClassName);
    }

    if (this.state.hovered) {
      classNames.push(this.props.hoverClassName);
    }

    return classNames.join(" ");
  }

  setHover(isHover) {
    this.setState({
      hovered: isHover
    });
  }

  tap() {
    this.props.onClick();
  }

  render() {
    return (
      <div
        role="button"
        className={this.getClassNames()}
        data-automation-id={this.props.automationId}
        tabIndex={-1}
        onTouchStart={this.tap}
        onMouseDown={this.props.onClick}
        onMouseEnter={this.setHover.bind(this, true)}
        onMouseLeave={this.setHover.bind(this, false)}
        onKeyDown={this.props.onKeyDown}
        style={this.props.style}
      >
        {this.props.isActive &&
          <span className={`${styles.checkWrapper}`}>
            <i className={"icon ion-ios-checkmark-empty"}></i>
          </span>
        }
        {this.props.children}
      </div>
    );
  }
}
