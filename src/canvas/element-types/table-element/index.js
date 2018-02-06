import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Table} from 'element-react';

@observer
export default class TableElement extends Component {
  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }

  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })

  render() {
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const columns = componentProps.columns;
    const data = componentProps.data;    


    
    return (
      <div 
        key={this.props.index}
        className={this.props.classes}
        onMouseDown={this.props.mouseDownAction}
        onDragOver={this.props.dragOverAction}
        onDrop={()=>{alert('hello')}}
        style={{top:this.props.postions.top,left:this.props.postions.left}}
      >
      <CanvasElement
        {...pick(this.props, Object.keys(CanvasElementPropTypes))}
        getSize={this.getSize}
      >
       <Table  pagination={false} style={{width,height}} columns={columns} dataSource={data} />
      </CanvasElement>
      </div>
    );
  }
}
