import TextElement from "./text-element";
import ImageElement from "./image-element";
import BoxElement from "./box-element";
import {ElementTypes } from "../../constants";
import LayoutElement from "./layout-element"
import TableElement from "./table-element"
import ListElement from "./list-element"
import FormItem from './fromItem-element'
import Form from './form-element'
import CoxComb  from './coxcomb-element'
import Button from './button-element'
/*定义组件选择*/
const elementFromType = new Map();
elementFromType.set(ElementTypes.BUTTON,Button);
elementFromType.set(ElementTypes.TEXT,TextElement);
elementFromType.set(ElementTypes.IMAGE,ImageElement);
elementFromType.set(ElementTypes.BOX,BoxElement);
elementFromType.set(ElementTypes.LAYOUT,LayoutElement);
elementFromType.set(ElementTypes.TABLE,TableElement);
elementFromType.set(ElementTypes.LIST,ListElement);
elementFromType.set(ElementTypes.FORMIITEM,FormItem);
elementFromType.set(ElementTypes.FORM,Form);
elementFromType.set(ElementTypes.COXCOMB,CoxComb);

export default elementFromType