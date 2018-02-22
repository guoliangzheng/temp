import React from "react";


import { ElementTypes } from "../../constants";
import Text from './text';
import Slide from './slide'
import Image from './image'
import Element  from './element'
import From from './form'
const elements = {};

elements[ElementTypes.SLIDE] = new Slide({
  type: ElementTypes.SLIDE,
  id:'',
  parent:'',
  props: {
    props: { style: {height:'1000',width:'700'}, transition: ["slide"] },
  },
  children: []
});
elements[ElementTypes.TEXT] =new Text( {
  type: ElementTypes.TEXT,
  defaultWidth: 52,
  defaultHeight: 36,
  defaultText: ["hello is me"],
  props: {//属性定义
    style: {
      wordBreak: "break-word",
      width: 200,
      height: 50,
      left:70,
      top:0,
      
    },
    type:'text',
    maxLength:10000,
    minLength:0,
    placeholder:'',
    disabled:false,
    size:'',
    rows:'',
    readOnly:false,
    resize:false,
    binding:'',
    prefix:'',
    suffix:'',
    prepend:'',
    append:'',
   
  }, 
  event:{//事件定义  
    blur:'',
    focus:'',
    change:'',
  },
  binding:"",//绑定的数据集
  children: null
});
elements[ElementTypes.IMAGE] =new Image( {
  type: ElementTypes.IMAGE,
  props: {
    src: `http://jxdinfo.com//r/cms/www/default/images/hz9.jpg`,
    style: {
      width: 281,
      height: 200,
      opacity: 0.2
    }
  },
  event:{
  
  },
  children: [],
});

elements[ElementTypes.BOX] = new Element({
  type: ElementTypes.BOX,
  resizeVertical: true,
  props: {
    paragraphStyle: "Heading 1",
    isQuote: false,
    size: 4,
    listType: null,
    style: {
      position:'relative',
      padding: "1rem",
      width:100,
      background:" #FFF",
      height: 100,
      color: "#111"
    }
  },
  children: []
});
elements[ElementTypes.LAYOUT] = new Element({
  type: ElementTypes.LAYOUT,
  resizeVertical: true,
  props: {
    style: {
      display: 'flex',
      flex: 1,
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      flexDirection:'column',
    }
  },
  children: []
});

elements[ElementTypes.LIST] = new Element({
  type: ElementTypes.LIST,
  props: {
    style: {
      width: 400,
      height: 400,
      left: 0,
      top: 0
    },
    header:'',
    footer:'',
    size:'smaller',
    data : [
      {
        value: 'Title 1',key:1,
      },
      {
        value: 'Title 2',key:2,
      },
      {
        value: ' Title 3',key:3,
      },
      {
        value: 'Title 4',key:4,
      }
    ]
  },
  children: []
});

elements[ElementTypes.TABLE] = new Element( {
  type: ElementTypes.TABLE,
  props: {
    style: {
      width: 400,
      height: 400,
      left: 0,
      top: 0
    },
    columns:[
      {
        label: "日期",
        prop: "date",
        width: 180
      }   
    ],
    stripe:true,
    border:true,
    fit:true,
    showHeader:true,
    highlightCurrentRow:true,
    emptyText:'',
    defaultExpandAll:false,
    showSummary:false,
    sumText:'合计',
    summaryMethod:''
  },
  event:{ 
  },
  binding:[],
  children: []
});
elements[ElementTypes.BUTTON] =new Element( {
  type: ElementTypes.BUTTON,
  props: {
    style: {
      width: 100,
      height: 50,
      left: 0,
      top: 0
    },
    label:'按钮',
    size:'large',
    type:'primary',
    plain:false,
    loading:false,
    disabled:false,
    icon:'',
    nativeType:'button'
  },
  event:{//事件定义  
   click:''
  },
  children: []
});


elements[ElementTypes.FORM] = new From({
  type: ElementTypes.FORM,
  props: {
    layout:"horizontal",
    style: {
      width: 400,
      height: 400,
      left: 0,
      top: 0
    },
  },
  children: []
});


elements[ElementTypes.FORMIITEM] =new Element( {
  type: ElementTypes.FORMIITEM,
  props: {
    label:'label',
    style: {
      width: 200,
      height: 20,
    },
  },
  children: []
});
elements[ElementTypes.COXCOMB] =new Element( {
  type: ElementTypes.COXCOMB,
  props: {
    
    name:'访问来源',
    type:'pie',
    radius:'55%',
    style: {
      width: 400,
      height: 400,
    },
  },
  binding:"",
  event:{},
  children: []
});
export default elements;
