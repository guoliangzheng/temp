import React from "react";

import plotlyPlaceholder from "../../assets/images/plotly-placeholder.png";
import imagePlaceholder from "../../assets/icons/image.svg";
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
  props: {
    isQuote: false,
    size: 4,
    listType: null,
    style: {
      wordBreak: "break-word",
      width: 200,
      height: 50,
      left:70,
      top:0,
      
    }
  },
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
  children: []
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
  resizeVertical: true,
  props: {
    style: {
      width: 400,
      height: 400,
      left: 0,
      top: 0
    },
    columns : [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }, {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#">Action 一 {record.name}</a>
          <a href="#">Delete</a>
          <a href="#" className="ant-dropdown-link">
          </a>
        </span>
      ),
    }],
    data : [{
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    }, {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    }, {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    }]
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
export default elements;
