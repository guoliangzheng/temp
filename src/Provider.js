import React from "react";
import PropTypes from 'prop-types'

export default class Provider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.store = props.store;
  }

  getChildContext() {
    return { store: this.store };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  store: PropTypes.object
};

Provider.propTypes = {
  store: PropTypes.object.isRequired,
  children: PropTypes.any
};
