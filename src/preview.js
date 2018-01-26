import React, { Component} from "react";
import { findDOMNode } from "react-dom";
import { observer } from "mobx-react";
import { Modal, Button } from 'antd';

@observer
class PreView extends Component  {
     static contextTypes = {
        store: PropTypes.object
      }; 
    
      renderChild=()=>{

        

      }
      constructor(props) {
        super(props);
        this.state = { };
      }
      render(){
         const components = this.context.store.previeComponents;
         return (
             <div> 

             </div>
        )
      }

}
export default PreView 