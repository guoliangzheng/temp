import {toJS, observable, computed, transaction, asReference,autorun } from "mobx";
import Immutable, { from } from "seamless-immutable";
import _,{ merge, mergeWith, pick, omit } from "lodash";
import uuid from '../util/uuid'
import elementMap from "../canvas/elements";
import {ElementTypes} from "../constants"
import xml2js from'xml2js';
import  builder from 'xmlbuilder';
import HttpService from "../httpservice";
import { findDOMNode } from "react-dom";
import Slide from "../canvas/elements/slide"
import Element from "../canvas/elements/element";
import fetch from 'node-fetch';
import Col from "antd/lib/grid/col";
import { lang } from "moment";

export default class Store{
    memroyXml = null;

    @observable width = 0;
    @observable height = 0;
    @observable left = 0;
    @observable top = 0;
    @observable scale = 1;

    @observable isDragging = false;
    @observable cursorType = null;
    @observable isResizing = false;
    @observable isDraggingSlide = false;
    @observable isDraggingElement = false;
    @observable isDraggingNewElement = false;

    @observable currentElement = null;
    @observable mouseOverElement = null;
    @observable actions = null; //动作
    @observable rootID = null;  //组件树根节点ID
    @observable dataSet = null; //数据集
    @observable components = null;//组件树
    @observable poprtyeChange =0;
    @observable dropTagElementId = null;
    history = [];//所有操作产生的对象信息

    historyIndex = -1;
    domRefs = new Map();//ID与虚拟DOM映射，可以根据组件ID找到DOM

    @computed get currentSlide() {
      return this.slide;
    }
    constructor(slide) {
      window.memroy = this;
      window.fetch = fetch;
      if(slide){
        //this.slide = slide;
      }else{
        /**
         构造初始化状态
         1）初始化slide，同时绑定init事件，并设置rootID和初始化组件树components
         2)初始化 actions，同时初始化init函数
         3）舒适化数据集
         
        */
        let id = uuid();
        //初始化一个根节点
        this.rootID = id;
        this.slide = new Slide({
          parent:null,
          id: id,
          type:'Slide',
          props: { style: {height:'100%',width:'100%'}, transition: ["slide"] },
          children: [],
          event:{
            init:'init'
          }
         }) 
         this.components = new Map();
         this.actions = new Map();
         //定义一个初始化方法，规定此方法为加载组件后调用的方法
         this.actions.set("init",{name:'init',body:'',paramters:'',action:function(){},describe:''});
         this.dataSet = new Map();
         this.components.set(id,this.slide);
         this.addhistroy();
        }
        window.dataSet = this.dataSet;
        window.actions = this.actions;

    }
  setCanvasSize({ width, height, left, top, scale }) {
    transaction(() => {
      this.width = width;
      this.height = height;
      this.left = left;
      this.top = top;
      this.scale = scale;
    });
  }

  updateElementDraggingState(isDraggingElement, isDraggingNewElement = false) {
    transaction(() => {
      this.isDragging = isDraggingElement;
      this.isDraggingElement = isDraggingElement;
      this.isDraggingNewElement = isDraggingNewElement;
    });
  }
  //放置元素时的方法
  dropElement(elementType,dropTagID, extraProps) {
    let selectItemid = dropTagID || this.rootID;
    const parent = this.components.get(selectItemid);
    if(parent==null)  return ;
    const element = elementMap[elementType];
    const id = uuid();
    const mergedProps = merge(element.props, extraProps);
    element.props = mergedProps;
    element.id = id;
    element.parent = selectItemid;
    transaction(() => {
      this.addhistroy();
      parent.children.push(id);
      this.components.set(id,element);
    })
    
  }
  /*获取放置对象的落脚点*/
  getDropPosition(dropTagID){
    let e=window.event;
    const id = dropTagID || this.rootID;
    const slideOffset = findDOMNode(this.domRefs.get(id)).getBoundingClientRect(); 
    let left = e.clientX - slideOffset.left;
    let top = e.clientY - slideOffset.top;

    if(left<=0) left=0;
    if(top<=0) top = 0;
    return {left,top}
  }
  /*设计dom的虚拟节点 */
  setDomRef(id,obj){
    this.domRefs.set(id,obj);
  }
  getDom(id){
    return  findDOMNode(this.domRefs.get(id));
  }

  updateElementResizeState(isResizingElement, cursor = null) {
    transaction(() => {
      this.cursorType = cursor;
      this.isResizing = isResizingElement;
    });
  }

  updateSlideDraggingState(isDraggingSlide) {
    transaction(() => {
      this.isDragging = isDraggingSlide;
      this.isDraggingSlide = isDraggingSlide;
    });
  }
  setCurrentElement(id) {
      this.currentElement = id;
  }
  setMouserOverElement(id){
    this.mouseOverElement = id;
  }
  //更新组件props
  updateElementProps(props) {
      if(this.currentElement==null) return;
      transaction(() => {
        this.addhistroy();
        const currentElement = this.components.get(this.currentElement);
        const newProps = merge(currentElement.props, props);
        currentElement.props =newProps; 
      })
    }
    //更新table  column
    updateTableCloumns(props,index){
      const currentElement = this.components.get(this.currentElement);
      const columns = currentElement.props.columns;
      const column = columns[index];
      const newColumn =  merge(column, props);
      transaction(()=>{
        this.addhistroy();
        var newCloums =[];
        for(let i =0,length=columns.length;i<length;i++){
          if(i==index){
            newCloums[i] = newColumn
          }else{
            newCloums[i] = columns[i];
          }
        }
        currentElement.props.columns = newCloums;
      })

    }
    //table新加 column
  addTableCloumns(){
    const currentElement = this.components.get(this.currentElement);
    const columns = currentElement.props.columns;
    transaction(()=>{
      this.addhistroy();
      var newCloums =[];
      for(let i =0,length=columns.length;i<length;i++){
          newCloums[i] = columns[i];
      }
      newCloums[columns.length] = {label:'新列'};
      currentElement.props.columns = newCloums;
    })


  }
  //更新组件事件
  updateElementEvent(event) {
    if(this.currentElement==null) return;
    transaction(() => {
      this.addhistroy();

      const currentElement = this.components.get(this.currentElement);
      const newEvent = merge(currentElement.event, event);
      currentElement.event =newEvent;
    })
  }
   //更新组件绑定
   updateElementBinding(binding) {
    if(this.currentElement==null) return;
    transaction(() => {
      this.addhistroy();

      const currentElement = this.components.get(this.currentElement);
      currentElement.binding =binding;
    })
  }
  /*在当前选中的组件上绑定action */
  bindingActionOnEvent(action,eventName){
    const data={};
    const {name} = action;
    data[eventName] =name;
    transaction(() => {
      this.addhistroy();

      const currentElement = this.components.get(this.currentElement);
      const newEvent = merge(currentElement.event, data);
      currentElement.event =newEvent;
      this.actions.set(name,action);
      
    })
    if(name=="init"){
      try{
        action.action();
      }catch(e){}
    }
  }
    /*在当前选中的组件上绑定action */
  bindingActionOnProps(action,propName){
    const {name} = action;
    transaction(() => {
      this.addhistroy();

      const currentElement = this.components.get(this.currentElement);
      currentElement.props[propName] =name;
      this.actions.set(name,action);    
     }) 
  }
  updateElementParent(props){


   /*  if(this.dropTagElementId==null) return;
    const currentElement = this.components.get(this.currentElement);
    if(currentElement==null) return;
    const currentID = this.currentElement;
    const oldParentID = currentElement.parent;
    if(!oldParentID) return;
    if(oldParentID==this.dropTagElementId){
      return ;
    }
    const oldParent = this.components.get(this.oldParentID);
    const newParent = this.components.get(this.dropTagElementId);

    newParent.children.push(this.currentElement);
    let tmep = []
    oldParent.children.map((id)=>{
        if(id!=currentID){
          tmep.push(id);
        }
      }
    );
    oldParent.children =tmep; */
  }
  @computed get getpoprtyeChange(){
    return this.poprtyeChange;
  }
  addAction(action){
    transaction(()=>{
      this.addhistroy();
      const {name} = action;
      this.actions.set(name,action);
    })
  }
  addDataSet(dataSet){
    debugger;
    transaction(()=>{
     // this.addhistroy();
      const {name} = dataSet;
      this.dataSet.set(name,dataSet);
    })
  }
  addFromItem(formID,item){
    transaction(()=>{
      this.addhistroy();
      const form = this.components.get(formID);
      const {label,type} = item;
      let formItem = elementMap[ElementTypes.FORMIITEM]
      formItem.props.label = label;
      const formItemId = uuid();
      formItem.parent = formID;
      formItem.id  = formItemId;

      let element = elementMap[type];
      const elementid = uuid();
      element.parent = formItemId;
      element.id = elementid;

      form.children.push(formItemId);
      formItem.children.push(elementid);
      this.components.set(formItemId,formItem);
      this.components.set(elementid,element); 
    })

  }
  @computed get currentComponents(){
    const currentElement = this.components.get(this.currentElement);
    return currentElement;
  }
  setDropTagElement(id){
    this.dropTagElementId= id;
  }
  getComponentByid(id){
    return this.components.get(id); 
  }

  @computed get dropTagElement(){
    const currentElement = this.components.get(this.dropTagElementId);
    return currentElement;
  }

  //所有变化添加到历史记录中
  addhistroy (){
   /*  transaction(() => {
      const me = this;
       const snapshot={
         components:this._ObjectToMap(toJS(me.components)),
         rootID : toJS(me.rootID),
         dataSet :this._ObjectToMap(toJS(me.dataSet)),
         actions:this._ObjectToMap( toJS(me.actions)),
         currentElement:toJS(me.currentElement)
       }
       let length = this.history.length;
       this.history[length] = snapshot; 
       this.historyIndex = length;
    })
    console.log('histroyt add',this.history.length); */
  }
  //object 转化为map对象
  _ObjectToMap(object){
    let map = new Map();
    for(let key in object){
      map.set(key,object[key]);
    }
    return map;
  }
  serialize(){
    this.xml = new Array();
    this.xml.push('<?xml version="1.0" encoding="UTF-8" ?>'); 
    this.xml.push("<root>")
    this.domToXml(this.rootID); 
    this.actionToxml();
    this.dataSetToXml();
    this.xml.push("</root>")
    this.memroyXml = this.xml.join("");
    return this.xml.join("");
  }
  analysis(xml){
    var parseString = xml2js.parseString;
    var me = this;
    parseString(xml, function (err, result) {
       me.deserializeRoot(result);
    });
    transaction(() => {
     /*  this.rootID = this.temprootID;
      this.components = this.tempCompents; */
    })
  }
  /*恢复到操作前的内容*/
  undo(){
    transaction(()=>{
      const length = this.history.length;
      const backIndex = this.historyIndex-1;
      if((length-1)<backIndex){
        return ;
      }
      const snapshot = this.history[backIndex];
      if(snapshot==null) return;
      this.components = snapshot.components;
      this.dataSet = snapshot.dataSet;
      this.actions  = snapshot.actions;
      this.rootID = snapshot.rootID;
      this.currentElement = snapshot.currentElement;
      this.historyIndex = backIndex;
    })
  }
  /*恢复恢复前的操作 */
  redo(){
    transaction(()=>{
      const length = this.history.length;
      const fowarIndex = this.historyIndex+1;
      if((length-1)>fowarIndex){
        return ;
      }
      const snapshot = this.history[fowarIndex];
      if(snapshot==null) return;
      this.components = snapshot.components;
      this.dataSet = snapshot.dataSet;
      this.actions  = snapshot.actions;
      this.rootID = snapshot.rootID;
      this.currentElement = snapshot.currentElement;
      this.historyIndex = fowarIndex;
    })


  }

  deserializeRoot(xmlNode){
    this.tempCompents = new Map();
    for(var key in xmlNode){
        const root = xmlNode[key];
        const {type,children} =root;
        const element = elementMap[type]; 
        const rootElement = element.deserialize(root);
        transaction(() => {
          this.rootID =rootElement.id;
          this.components = new Map();
          this.components.set(rootElement.id,rootElement);
        })
        this.deserializeChildren(children);     
    }
  }
  deserializeChildren(nodes){
    if(nodes==null || nodes.length==0) return;

       for(let key in nodes[0]){
         let nodeArr = nodes[0][key];
  
         for(let i=0,length=nodeArr.length;i<length;i++ ){
                let node = nodeArr[i];
                const {children,type} = node;
                const element = elementMap[type];  
                const child= element.deserialize(node);
                transaction(() => {
                  this.components.set(child.id,child);
                })
                this.deserializeChildren(children);
        }  
      }
    
  }

  load(){
    const me = this;
    me.analysis(this.memroyXml); 
  }
  save(){
      let xml = this.serialize()
      alert(xml);
      HttpService.save({
        url: 'http://127.0.0.1:8080/save',
        data: {
            xml:xml
        },
        success: res => {
         
        }
    });
  }
  domToXml(elementid){
    const obj = this.components.get(elementid);
    if(!obj) return ;
    const {id,children,type} = obj;

    this.xml.push(obj.serializeStart(obj).join(""));1
    this.xml.push('<children>')
    if(children!=null){
      for(let i =0,length = children.length;i<length;i++){
        this.domToXml(children[i]);
      }
    }
    this.xml.push('</children>')
    this.xml.push(obj.serializeEnd(type));
  }
  dataSetToXml(){
    this.xml.push("<DataSet>")

    this.dataSet.forEach(element => {
      const{name,describe,type,initData}=element;
      this.xml.push("<child>")
      this.xml.push("<name>"+name+"</name>");
      this.xml.push("<describe>"+describe+"</describe>");
      this.xml.push("<type>"+type+"</type>");
      this.xml.push("<initData><![CDATA["+JSON.stringify(initData)+"]]></initData>");
      this.xml.push("</child>")
    });
    this.xml.push("</DataSet>")
  } 
  actionToxml(){
    this.xml.push("<Actions>")
    this.actions.forEach(element => {
      const{name,describe,body,paramters,action}=element;
      this.xml.push("<child>")
      this.xml.push("<name>"+name+"</name>");
      this.xml.push("<describe>"+describe+"</describe>");
      this.xml.push("<body><![CDATA["+body+"]]></body>");
      this.xml.push("<paramters><![CDATA["+paramters+"]]></paramters>");
      this.xml.push("<action><![CDATA["+action.toString()+"]]></action>");
      this.xml.push("</child>")
    });
    this.xml.push("</Actions>")
  }
}