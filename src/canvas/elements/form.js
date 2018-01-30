import Element from './element'
export default class From extends Element{
    constructor(...items){
        super(...items)
     }

     deserializePropety=(propsArr)=>{
        if(propsArr == null || propsArr.length==0) return {};
        const props = {};
        const temp = propsArr[0];
        const {style,layout} = temp;
       
        if(layout){
           props.layout = layout[0];
        }
        if(style){
          props.style = JSON.parse(style[0]);
        }
       
        return props;     
      }
}

