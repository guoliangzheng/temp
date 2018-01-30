export const DraggableTypes = {
  UI_ELEMENT: "UI_ELEMENT"
};

export const ElementTypes = {
  SLIDE:'Slide',
  HEADING: "Heading",
  TEXT: "Text",
  IMAGE: "Image",
  FORM:'Form',
  FORMIITEM:'FormItem',
  BOX:'Box',
  LIST:'List',
  LAYOUT:'Layout',
  LINK: "Link",
  TABLE: "Table",
  IFRAME: "IFrame"
};
export const IconTypes = {
  ...ElementTypes
};
export const SpringSettings = {
  DRAG: { stiffness: 1000, damping: 50 },
  RESIZE: { stiffness: 210, damping: 20 }
};

export const SNAP_DISTANCE = 15;
export const BLACKLIST_CURRENT_ELEMENT_DESELECT = "ignoreElementDeselect";

export const MODES = {
  TOP_LEFT: "TOP_LEFT",
  TOP: "TOP",
  TOP_RIGHT: "TOP_RIGHT",
  RIGHT: "RIGHT",
  BOTTOM_RIGHT: "BOTTOM_RIGHT",
  BOTTOM: "BOTTOM",
  BOTTOM_LEFT: "BOTTOM_LEFT",
  LEFT: "LEFT",
  MOVE: "MOVE"
};




