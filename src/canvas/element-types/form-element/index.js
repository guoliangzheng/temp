import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { List } from 'antd';
import { Form} from 'antd';
import FormDesginer from './form-desginer'
import { DropTarget } from 'react-dnd'
const boxTarget = {
	drop(props,monitor) {
    return { id: props.index}
	},
}
@DropTarget("element-types", boxTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})) 
@observer
export default class FormElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }
  constructor(props){
    super(props);
    this.state={
      isedit:false
    }
  }
  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })
  openEditor=()=>{
    this.setState({isedit:true})
  }
  closeEditor=()=>{
    this.setState({isedit:false})
  }
  render() {
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const data = componentProps.data; 
    const layout = componentProps.layout;
    const { canDrop, isOver, connectDropTarget } = this.props;
    return connectDropTarget(
      <div 
        canDrop ={canDrop}
        isOver ={isOver}
        key={this.props.index}
        className={this.props.classes}
        onMouseDown={this.props.mouseDownAction}
        onDragOver={this.props.dragOverAction}
        style={{top:this.props.postions.top,left:this.props.postions.left}}
      >
      <CanvasElement
        {...pick(this.props, Object.keys(CanvasElementPropTypes))}
        getSize={this.getSize}
      >
         <Form onDoubleClick={this.openEditor} style={{width,height}} layout={layout} >
              {this.props.children}
              {this.state.isedit?<FormDesginer onClose={this.closeEditor} id={this.props.index}/>:''}
         </Form>
      </CanvasElement>
      </div>
    );
  }
}