import React, { Component} from "react";
import PropTypes from 'prop-types';

import styles from "./element-item.css";
import { DragSource } from 'react-dnd'

const boxSource = {
	beginDrag(props) {
		return {
			elementType: props.elementType,
		}
	},

	endDrag(props, monitor) {
    const item = monitor.getItem()
    const dropResult = monitor.getDropResult()
    console.log("dropResult",dropResult)
		if (dropResult) {
      let {left,top}= props.getDropPosition(dropResult.id);
      props.onDrop(props.elementType,dropResult.id,{style:
          {
            left: left,
            top:top
          }
        }
      )
		}
	},
}

@DragSource("element-types", boxSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class ElementItem extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
    elementType: PropTypes.string.isRequired,

    scale: PropTypes.number
  };

  static contextTypes = {
    store: PropTypes.object
  };
  constructor(props, context) {
    super(props, context);
  }
  render() {
    const {
      elementType,element:{label}
    } = this.props;
		const {  connectDragSource } = this.props 
    return  connectDragSource(
       <li className={styles.item}>
        <span>{label}</span>
      </li>
    );
  }
}

export default ElementItem;
