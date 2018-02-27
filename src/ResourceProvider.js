import React from "react";
import PropTypes from 'prop-types'

export default class ResouceProvider extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.resouceStore = props.store;
  }

  getChildContext() {
    return { resouceStore: this.resouceStore };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

ResouceProvider.childContextTypes = {
  resouceStore: PropTypes.object
};

ResouceProvider.propTypes = {
  resouceStore: PropTypes.object.isRequired,
  children: PropTypes.any
};
