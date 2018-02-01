import Element from './element'
export default class Image extends Element{
    constructor(...items){
        super(...items)
     }

     deserializePropety=(propsArr)=>{
        if(propsArr == null || propsArr.length==0) return {};
        const props = {};
        const temp = propsArr[0];
        const {style,transition,isQuote,listType,size,src} = temp;
        if(src){
            props.src = src[0];
        }
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

