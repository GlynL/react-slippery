// https://hackernoon.com/creating-a-library-of-react-components-using-create-react-app-without-ejecting-d182df690c6b

import React, { useState, useReducer, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Slide from "./Slide";
import "./style.css";

// reducer for main state
function reducer(state, action) {
  switch (action.type) {
    // next & prev  remove the transition animation
    case "next":
      return {
        ...state,
        translate: "0",
        transition: "none"
      };
    case "prev":
      return {
        ...state,
        translate: "0",
        transition: "none"
      };
    //adds transition and translate onto slides
    case "translate":
      return { ...state, translate: action.payload, transition: "all 0.5s" };
    //  changes current images to be in view - runs on state.images & state.translate changes
    case "setViewImages":
      return { ...state, viewImages: action.payload };
    // set all images array
    case "setImages":
      return { ...state, images: action.payload };
    case "slidesAmount":
      return { ...state, slidesAmount: action.payload };
    default:
      return state;
  }
}

export default ({ images }) => {
  // put size into state - no changes atm
  const [size, setSize] = useState({
    height: 129,
    width: 229
  });

  // setup reducer with initial state
  const [state, dispatch] = useReducer(reducer, {
    translate: "0",
    images: [],
    viewImages: [],
    slidesAmount: 10
  });

  // setup images into slides
  useEffect(() => {
    const styledImages = images.map((image, idx) => (
      <img key={idx} src={image} alt="dog" className="image" />
    ));

    dispatch({
      type: "setImages",
      payload: styledImages
    });
  }, []);

  // responsiveness
  function setSlidesAmount() {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    const slidesAmount = mediaQuery.matches ? 5 : 10;
    dispatch({ type: "slidesAmount", payload: slidesAmount });
  }

  useEffect(() => {
    setSlidesAmount();
    window.addEventListener("resize", setSlidesAmount);
    return () => window.removeEventListener("resize", setSlidesAmount);
  }, []);

  useEffect(() => {
    const payload = state.images.slice(0, state.slidesAmount);
    dispatch({
      type: "setViewImages",
      payload
    });
  }, [state.translate, state.images, state.slidesAmount]);

  function handleClick(e) {
    // next or prev btn
    const type = e.currentTarget.name;
    // copy images - no mutation
    const copy = [...state.images];

    if (type === "next") {
      // remove first item and place it at end
      copy.push(copy.shift());
      // animate slide
      dispatch({
        type: "translate",
        payload: `-${size.width}px`
      });
      // after animation - dispatch next action & set new images
      setTimeout(() => {
        dispatch({
          type: "setImages",
          payload: copy
        });
        dispatch({
          type: "next"
        });
      }, 500);
    }
    // refer above comments
    if (type === "prev") {
      copy.unshift(copy.pop());
      dispatch({
        type: "translate",
        payload: `${size.width}px`
      });
      setTimeout(() => {
        dispatch({
          type: "setImages",
          payload: copy
        });
        dispatch({
          type: "prev"
        });
      }, 500);
    }
  }

  // create slides from images currently in view state
  // keep styling in javascript - might add prop option
  const slides = state.viewImages.map(image => (
    <Slide
      image={image}
      size={size}
      transition={state.transition}
      translate={state.translate}
      key={`slide-${image.key}`}
    />
  ));

  return (
    <div
      className="slider"
      style={{
        height: size.height * 2
      }}
    >
      <button
        style={{
          height: size.height
        }}
        className="btn btn--prev"
        name="prev"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {slides}
      <button
        style={{
          height: size.height
        }}
        className="btn btn--next"
        name="next"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
