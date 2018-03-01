import elementMap from "./index";
/*扩展组件数据定义，用户数据序列化和反序列化，这个地方定义的不是很好，需要重构 */
export default class Element extends Object{
     
      constructor(...items) {
            super(...items);
      }     
      serializeStart=(compent)=>{
        let xml = new Array();
        const {id,type,props,children,parent,event,binding} = compent;
        xml.push('<'+type+">")
        xml.push('<parent>'+parent+'</parent>')
        xml.push('<type>'+type+'</type>')
        xml.push('<id>'+id+'</id>')
        xml.push('<props>')    
        for(var key in props ){
          xml.push('<'+key+'><![CDATA['+JSON.stringify( props[key] )+']]></'+key+'>')
        }     
        xml.push('</props>')  
        xml.push('<event><![CDATA['+JSON.stringify(event )+']]></event>')
        xml.push('<binding>'+binding+'</binding>')

        return xml;
     }
     serializeEnd=(type)=>{
       return '</'+type+">"
     }
     deserialize=(xmlNode)=>{
        const {type,props,id,parent,children} = xmlNode;
        let typetemp = this.deserializeType(type);
        const element = elementMap[typetemp] ;
        element.id = this.deserializeID(id);
        element.type = typetemp;
        element.parent = this.deserializeParent(parent);
        element.props = this.deserializePropety(props);
        element.children = this.deserializeChildren(children);
        return element;
     }
     deserializeID=(idArray)=>{
        if(idArray == null || idArray.length==0) return null;
        return idArray[0];
     }
     deserializeParent=(parentArray)=>{
      if(parentArray == null || parentArray.length==0) return null;
      return parentArray[0];
     }
     deserializeType=(typeArray)=>{
      if(typeArray == null || typeArray.length==0) return null;
      return typeArray[0];
     }
     
     deserializeChildren=(nodes)=>{
        const children = new Array();
        if(nodes==null || nodes.length==0) return;
        for(let key in nodes[0]){
          let nodeArr = nodes[0][key];
  
          for(let i=0,length=nodeArr.length;i<length;i++ ){
                let node = nodeArr[i];
                const {id} = node;
                children.push(id[0])
        }  
      }  
      return children;
    }
    deserializePropety=(propsArr)=>{
      if(propsArr == null || propsArr.length==0) return {};
      const props = {};
      const temp = propsArr[0];
      const {style,transition,isQuote,listType,size} = temp;
      if(style){
        props.style = JSON.parse(style[0]);
      }
      if(transition){
        props.transition = transition[0];
      }
      if(isQuote){
        props.isQuote = isQuote[0];
      }
      if(listType){
        props.isQuote = listType[0];
      }
      if(size){
        props.size = size[0];
      }
      return props;     
    }
}

