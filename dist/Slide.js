import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from "react";
export default (function (_ref) {
  var size = _ref.size,
      image = _ref.image,
      transition = _ref.transition,
      translate = _ref.translate;

  // state for hover
  var _useState = useState(false),
      _useState2 = _slicedToArray(_useState, 2),
      hovered = _useState2[0],
      setHovered = _useState2[1];

  var _useState3 = useState(false),
      _useState4 = _slicedToArray(_useState3, 2),
      hoverTransition = _useState4[0],
      setTransition = _useState4[1]; // destructure prop


  var height = size.height,
      width = size.width; // set transition-duration

  var animationRate = 300;
  return React.createElement("div", {
    className: "slide" // styling based on state/props
    ,
    style: {
      height: "".concat(hovered ? height * 2 : height, "px"),
      width: "".concat(hovered ? width * 2 : width, "px"),
      // hoverTransition separate as needs a delay to
      transition: hoverTransition ? "width ".concat(animationRate, "ms, height ").concat(animationRate, "ms") : transition,
      transform: "translateX(".concat(translate, ")")
    },
    onMouseEnter: function onMouseEnter() {
      setHovered(true);
      setTransition(true);
    },
    onMouseLeave: function onMouseLeave() {
      setHovered(false);
      setTimeout(function () {
        return setTransition(false);
      }, animationRate);
    }
  }, image);
});