import { observable, computed, transaction, asReference,autorun } from "mobx";
import Immutable from "seamless-immutable";
import { merge, mergeWith, pick, omit } from "lodash";
import uuid from '../util/uuid'
import elementMap from "../canvas/elements";
import {ElementTypes} from "../constants"
import xml2js from'xml2js';
import  builder from 'xmlbuilder';
import HttpService from "../httpservice";
import { findDOMNode } from "react-dom";

export default class Store{
    @observable rootID = null;
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

    @observable side = false;
    @observable components = null;
    @observable poprtyeChange =0;
    @observable dropTagElementId = null;
    domRefs = new Map();

    @computed get currentSlide() {
      return this.slide;
    }
    constructor(slide) {
      window.memroy = this;

      if(slide){
        this.slide = slide;
      }else{
        let id = uuid();
        this.rootID = id;
        this.slide = Immutable.from( {
          parent:null,
          id: id,
          type:'Slide',
          props: { style: {height:'1000',width:'700'}, transition: ["slide"] },
          children: []
         })
         this.components = new Map();
         this.components.set(id,this.slide);
        }
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

  dropElement(elementType,dropTagID, extraProps) {
    let selectItemid = dropTagID || this.rootID;
    const parent = this.components.get(selectItemid);
    if(parent==null)  return ;
    const element = elementMap[elementType];
    const id = uuid();
    const mergedProps = merge(element.props, extraProps);
    const child= {
      ...element,
      parent:selectItemid,
      props: mergedProps,
      id: id,
      children:[]
    }
    parent.children.push(id);
    this.components.set(id,child);
    
  }
  getDropPosition(dropTagID){
    let e=window.event;
    const id = dropTagID || this.rootID;
    const slideOffset = findDOMNode(this.domRefs.get(id)).getBoundingClientRect(); 
    let left = e.clientX - slideOffset.left;
    let top = e.clientY - slideOffset.top;
    return {left,top}
  }
  setDomRef(id,obj){
    this.domRefs.set(id,obj);
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

  updateElementProps(props) {
      if(this.currentElement==null) return;
      const currentElement = this.components.get(this.currentElement);
      const newProps = merge(currentElement.props, props);
      currentElement.props =newProps;
      this.poprtyeChange = this.poprtyeChange^1;
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

  addFromItem(formID,item){
    const form = this.components.get(formID);
    const {label,type} = item;
    let formItem = elementMap[ElementTypes.FORMIITEM]
    formItem.props.label = label;
    const formItemId = uuid();
    formItem= {
      ...formItem,
      parent:formID,
      id: formItemId,
      children:[]
    };

    let element = elementMap[type];
    const elementid = uuid();
    element= {
      ...element,
      parent:formItemId,
      id: elementid,
      children:[]
    };
    form.children.push(formItemId);
    formItem.children.push(elementid);
    this.components.set(formItemId,formItem);
    this.components.set(elementid,element); 
 
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

  serialize(){
    this.xml = new Array();
    this.xml.push('<?xml version="1.0" encoding="UTF-8" standalone="yes"?>');
    this.toxml(this.rootID);
    console.log(this.xml.join(""))
    HttpService.save({
        url: 'http://127.0.0.1:8080/save',
        data: {
            xml:this.xml.join("")
        },
        success: res => {
          /*   console.log(res);
            if (res.retCode == 0) {
                this.setState({
                    liked: true
                })
            } else {
                R_UiService.Toaster(res.retMsg)
            } */
        }
    });


  }
  toxml(elementid){
    /*  const obj = this.components.get(elementid)
    if(!obj) return ;
    alert(obj.type)
    const {id,props,type} = obj;
    if(this.xml==null){
       this.xml =  builder.create(obj.type);
    }else{
      this.xml.ele(obj.type);
    }
    this.xml.ele("id",obj.id).up()
    this.xml.ele("parent",obj.id).up()
    const children = obj.children;
    if(children ==null) return ;
    for(let i =0,length = children.length;i<length;i++){
      this.xml.ele("children");
       this.toxml(children[i]);
    }  */
    const obj = this.components.get(elementid)
    if(!obj) return ;
    const {id,parent,props,type,children} = obj;
    this.xml.push('<'+type+">")
    this.xml.push('<parent>'+parent+'</parent>')
    this.xml.push('<type>'+type+'</type>')
    this.xml.push('<id>'+id+'</id>')
  /*   var builder = new xml2js.Builder({cdata:true});
    var xml = builder.buildObject(obj); */
    console.log('json',JSON.stringify( obj ));
    for(var key in props ){
      this.xml.push('<'+key+'><![CDATA['+JSON.stringify( props[key] )+']]></'+key+'>')
    }
    this.xml.push('<children>')
    if(children!=null){
      for(let i =0,length = children.length;i<length;i++){
        this.toxml(children[i]);
      }
    }
    this.xml.push('</children>')
    this.xml.push('</'+type+">");




  } 
}