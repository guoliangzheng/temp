import React, { Component } from "react";
//用于处理组件异常的
export default class PotentialError extends React.Component {   
    constructor(props) {     
      super(props);     
      this.state = { error: false };
    }
    componentDidCatch(error, info) {     
      this.setState({ error, info });
    }
    render() {
      if (this.state.error) {
        return  <h1>Error: {this.state.error.toString()}</h1>;
      }
      return this.props.children;   
    } 
}