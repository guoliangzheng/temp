import React, { Component} from "react";
import { Motion, spring } from "react-motion";
import PropTypes from 'prop-types';
import {
  SpringSettings,
  BLACKLIST_CURRENT_ELEMENT_DESELECT
} from "../constants";
import Icon from "../icon";
import styles from "./element-item.css";
import { DragSource } from 'react-dnd'

const addedPadding = 2;
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
    this.state = {
      delta: [0, 0],
      mouseStart: [0, 0],
      mouseOffset: [0, 0],
      canvasOffset: [0, 0],
      isPressed: false,
      isUpdating: false
    };
  }

 

  render() {
    const {
      elementType,
      elementLeft,
      elementTop,
      elementWidth,
      elementHeight
    } = this.props;

    const {
      isUpdating,
      isOverCanvasPosition,
      isPressed,
      delta: [x, y],
      mouseOffset: [offsetX, offsetY]
    } = this.state;

    const motionStyles = {
      translateX: spring(x - offsetX, SpringSettings.DRAG),
      translateY: spring(y - offsetY, SpringSettings.DRAG),
      opacity: spring(isPressed ? 0.9 : 0, SpringSettings.DRAG),
      padding: spring(isPressed ? 2 : 0, SpringSettings.DRAG)
    };

    if (isUpdating) {
      motionStyles.translateX = isPressed ? x - offsetX : 0;
      motionStyles.translateY = isPressed ? y - offsetY : 0;
      motionStyles.padding = isPressed ? addedPadding : 0;
      motionStyles.opacity = 0.9;
    }

		const { isDragging, connectDragSource } = this.props 
    return  connectDragSource(
      <div
        className={`${styles.wrapper} ${BLACKLIST_CURRENT_ELEMENT_DESELECT}`}
        style={{
          width: elementWidth,
          height: elementHeight,
          cursor: isPressed ? "-webkit-grabbing" : "-webkit-grab"
        }}
      >
      
        <div
          className={styles.item}
        >
          <h4>
            {elementType}
          </h4>
        </div>
      </div>
    );
  }
}

export default ElementItem;
