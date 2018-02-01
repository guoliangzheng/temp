import React, { Component } from "react";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import styles from "./index.css";
import PropTypes, { element } from 'prop-types';

import TextProperty from './text-property'
import ImageProperty from './image-property'
import TableProperty from './table-property'
import ListProperty from './list-property'
import FormProperty  from './form-property'
import { ElementTypes, BLACKLIST_CURRENT_ELEMENT_DESELECT } from "../../constants";
import ComCobxProperty from "./coxcomb-property";
const propertyEditorMappering = new Map();
propertyEditorMappering.set(ElementTypes.TEXT,TextProperty)
propertyEditorMappering.set(ElementTypes.IMAGE,ImageProperty)
propertyEditorMappering.set(ElementTypes.TABLE,TableProperty)
propertyEditorMappering.set(ElementTypes.LIST,ListProperty)
propertyEditorMappering.set(ElementTypes.FORM,FormProperty)
propertyEditorMappering.set(ElementTypes.FORM,FormProperty)
propertyEditorMappering.set(ElementTypes.COXCOMB,ComCobxProperty)

@observer
class PropertyEditor extends Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.state = {
      hasMenu: false,
      contextualMenu: null
    };
  }

  componentDidMount() {
    autorun(() => {

      if (this.context.store.currentElement) {

        const currentElement =  this.context.store.components.get(this.context.store.currentElement)

        this.setState({
          hasMenu: true,
          contextualMenu: currentElement.type
        });
        return;
      }
      this.setState({hasMenu: false, contextualMenu: null });
    });
  }

  render() {
    const moveMenu = this.state.hasMenu ? styles.slidesInactive : "";
    const { poprtyeChange,contextualMenu} = this.state;
    const Element = propertyEditorMappering.get(contextualMenu);
    if(Element==null){
      return <div></div>
    }
    return (
      <div className={`${styles.editor} ${BLACKLIST_CURRENT_ELEMENT_DESELECT}`}>
            <Element>
            </Element>
      </div>
    );
  }
}

export default PropertyEditor;
