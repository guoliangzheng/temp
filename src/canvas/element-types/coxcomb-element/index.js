import React, { Component } from "react";
import { pick } from "lodash";
import CanvasElement, { CanvasElementPropTypes } from "../../canvas-element";
import PropTypes from 'prop-types';
import { observer } from "mobx-react";
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件

@observer
export default class CoxCombElement extends Component {

  constructor(props,context){
    super(props,context);
    this.oldWidth = null;
    this.oldHeight =null;
  }

  static propTypes = {
    ...CanvasElementPropTypes,
    rect: PropTypes.object,
    component: PropTypes.shape({
      props: PropTypes.object
    })
  }
  static contextTypes = {
    store: PropTypes.object
  };
  getSize = () => ({
    width: this.props.component.props.style.width,
    height: this.props.component.props.style.height,
    left: this.props.component.props.style.left,
    top: this.props.component.props.style.top
  })

  componentDidMount() {
    let myChart = echarts.init(this.coxcomb) 
    let options = this.setPieOption();
    myChart.setOption(options)
    const componentProps = this.props.component.props;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    this.oldWidth = width;
    this.oldHeight = height;
}

componentDidUpdate() {
  const componentProps = this.props.component.props;
  const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
  const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
  if(this.oldWidth!=width || this.oldHeight!=height){
    echarts.dispose(this.coxcomb);
    echarts.init(this.coxcomb) 

  }
  this.oldWidth = width;
  this.oldHeight = height;
  let myChart = echarts.getInstanceByDom(this.coxcomb)
  let options = this.setPieOption()
  myChart.setOption(options)
}
setPieOption=()=> {
  const {binding} =  this.props.component;
  const { name,type,radius } = this.props.component.props; 
  const {dataSet} = this.context.store;
  const data =dataSet.has(binding)?dataSet.get(binding).data:[];

  let arr = [];
  data.forEach(element => {
    let obj = {};
    obj.value = element.value;
    obj.name = element.name;
    arr.push(obj)
  });
  return {
    series : [
        {
            name: name,
            type: type,
            radius: radius,
            data:arr
        }
    ]
   }
}
render() {
    const componentProps = this.props.component.props;
    const {binding} =  this.props.component;
    const width = this.props.rect ? this.props.rect.width : componentProps.style.width;
    const height = this.props.rect ? this.props.rect.height : componentProps.style.height;
    const {dataSet} = this.context.store;
    const bingdingValue =dataSet.has(binding)?dataSet.get(binding).data:[];
  
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
      <div ref={coxcomb=>this.coxcomb=coxcomb} data={bingdingValue} style={{width,height}}></div>
      </CanvasElement>
      </div>
    );
  }
}
