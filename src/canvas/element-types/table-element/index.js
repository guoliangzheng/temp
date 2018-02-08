import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
import { Table} from 'element-react';
import TilteUtil from '../../util/titleUtil'
import PotentialError from '../../potentialError';
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
  static contextTypes = {
    store: PropTypes.object
  };


  render() {
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const {event,binding} =  this.props.component;
    const {actions,dataSet} = this.context.store;
    const bingdingValue =dataSet.has(binding)?dataSet.get(binding).data:[];
    const eventObject = {};
    for(var key in event){
        const newKey  ="on"+TilteUtil.titleCase(key);
        eventObject[newKey]=actions.has(event[key])?actions.get(event[key]).action:null;
    }
    const columns= componentProps.columns;
    return (
      <div 
        key={this.props.index}
        className={this.props.classes}
        onMouseDown={this.props.mouseDownAction}
        onDragOver={this.props.dragOverAction}
        style={{top:this.props.postions.top,left:this.props.postions.left}}
      >
        <PotentialError>
            <CanvasElement
              {...pick(this.props, Object.keys(CanvasElementPropTypes))}
              getSize={this.getSize}
            >
            <Table  {...componentProps} {...eventObject} columns={columns} height={height} style={{width}} data={bingdingValue} />
            </CanvasElement>
        </PotentialError>
      </div>
    );
  }
}
