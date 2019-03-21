import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread";
// https://hackernoon.com/creating-a-library-of-react-components-using-create-react-app-without-ejecting-d182df690c6b
import React, { useState, useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slide from "./Slide";
import "./style.css"; // reducer for main state

function reducer(state, action) {
  switch (action.type) {
    // next & prev  remove the transition animation
    case "next":
      return _objectSpread({}, state, {
        translate: "0",
        transition: "none"
      });

    case "prev":
      return _objectSpread({}, state, {
        translate: "0",
        transition: "none"
      });
    //adds transition and translate onto slides

    case "translate":
      return _objectSpread({}, state, {
        translate: action.payload,
        transition: "all 0.5s"
      });
    //  changes current images to be in view - runs on state.images & state.translate changes

    case "setViewImages":
      return _objectSpread({}, state, {
        viewImages: action.payload
      });
    // set all images array

    case "setImages":
      return _objectSpread({}, state, {
        images: action.payload
      });

    case "slidesAmount":
      return _objectSpread({}, state, {
        slidesAmount: action.payload
      });

    default:
      return state;
  }
}

export default (function (_ref) {
  var images = _ref.images;

  // put size into state - no changes atm
  var _useState = useState({
    height: 129,
    width: 229
  }),
      _useState2 = _slicedToArray(_useState, 2),
      size = _useState2[0],
      setSize = _useState2[1]; // setup reducer with initial state


  var _useReducer = useReducer(reducer, {
    translate: "0",
    images: [],
    viewImages: [],
    slidesAmount: 10
  }),
      _useReducer2 = _slicedToArray(_useReducer, 2),
      state = _useReducer2[0],
      dispatch = _useReducer2[1]; // setup images into slides


  useEffect(function () {
    var styledImages = images.map(function (image, idx) {
      return React.createElement("img", {
        key: idx,
        src: image,
        alt: "dog",
        className: "image"
      });
    });
    dispatch({
      type: "setImages",
      payload: styledImages
    });
  }, []); // responsiveness

  function setSlidesAmount() {
    var mediaQuery = window.matchMedia("(max-width: 500px)");
    var slidesAmount = mediaQuery.matches ? 5 : 10;
    dispatch({
      type: "slidesAmount",
      payload: slidesAmount
    });
  }

  useEffect(function () {
    setSlidesAmount();
    window.addEventListener("resize", setSlidesAmount);
    return function () {
      return window.removeEventListener("resize", setSlidesAmount);
    };
  }, []);
  useEffect(function () {
    var payload = state.images.slice(0, state.slidesAmount);
    dispatch({
      type: "setViewImages",
      payload: payload
    });
  }, [state.translate, state.images, state.slidesAmount]);

  function handleClick(e) {
    // next or prev btn
    var type = e.currentTarget.name; // copy images - no mutation

    var copy = _toConsumableArray(state.images);

    if (type === "next") {
      // remove first item and place it at end
      copy.push(copy.shift()); // animate slide

      dispatch({
        type: "translate",
        payload: "-".concat(size.width, "px")
      }); // after animation - dispatch next action & set new images

      setTimeout(function () {
        dispatch({
          type: "setImages",
          payload: copy
        });
        dispatch({
          type: "next"
        });
      }, 500);
    } // refer above comments


    if (type === "prev") {
      copy.unshift(copy.pop());
      dispatch({
        type: "translate",
        payload: "".concat(size.width, "px")
      });
      setTimeout(function () {
        dispatch({
          type: "setImages",
          payload: copy
        });
        dispatch({
          type: "prev"
        });
      }, 500);
    }
  } // create slides from images currently in view state
  // keep styling in javascript - might add prop option


  var slides = state.viewImages.map(function (image) {
    return React.createElement(Slide, {
      image: image,
      size: size,
      transition: state.transition,
      translate: state.translate,
      key: "slide-".concat(image.key)
    });
  });
  return React.createElement("div", {
    className: "slider",
    style: {
      height: size.height * 2
    }
  }, React.createElement("button", {
    style: {
      height: size.height
    },
    className: "btn btn--prev",
    name: "prev",
    onClick: handleClick
  }, React.createElement(FontAwesomeIcon, {
    icon: faAngleLeft
  })), slides, React.createElement("button", {
    style: {
      height: size.height
    },
    className: "btn btn--next",
    name: "next",
    onClick: handleClick
  }, React.createElement(FontAwesomeIcon, {
    icon: faAngleRight
  })));
});