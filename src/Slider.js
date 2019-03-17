import React, { useState, useReducer, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const slideStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  height: 129 * 1.5 + "px"
};

const previousBtn = {
  position: "absolute",
  left: 0,
  zIndex: 1,
  height: "129px"
};

const nextBtn = {
  position: "absolute",
  zIndex: 1,

  right: 0,
  height: "129px"
};

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return {
        ...state,
        position: state.position + 1,
        translate: "0",
        transition: "none"
      };
    case "prev":
      return {
        ...state,
        position: state.position - 1 >= 0 ? state.position - 1 : 0,
        translate: "0",
        transition: "none"
      };
    case "translate":
      return { ...state, translate: action.payload, transition: "all 0.5s" };
    case "slideChange":
      return { ...state, viewSlides: action.payload };

    case "setSlides":
      return { ...state, slides: action.payload };
    default:
      return state;
  }
}

export default ({ images }) => {
  const [size, setSize] = useState({ height: 129, width: 229 });

  const [state, dispatch] = useReducer(reducer, {
    position: 0,
    translate: "0",
    slides: [],
    viewSlides: []
  });

  // setup images into slides
  useEffect(() => {
    images = images.map(image => (
      <img
        src={image}
        alt="dog"
        style={{ height: `${size.height}px`, width: `${size.width}px` }}
      />
    ));
    const slides = images.map(image => (
      <div
        className="slide"
        style={{
          height: `${size.height}px`,
          width: `${size.width}px`,
          transition: state.transition,
          transform: `translateX(${state.translate})`
        }}
      >
        {image}
      </div>
    ));
    dispatch({ type: "setSlides", payload: slides });
  }, []);

  useEffect(() => {
    const payload = state.slides.slice(state.position, state.position + 10);
    dispatch({ type: "slideChange", payload });
  }, [state.position, state.translate, state.slides]);

  function handleClick(e) {
    const type = e.target.name;
    if (type === "next") {
      dispatch({ type: "translate", payload: "-229px" });
      setTimeout(() => dispatch({ type: "next" }), 500);
    }
    if (type === "prev") {
      if (state.position <= 0) {
        const endSlide = state.slides.pop();
        state.slides.unshift(endSlide);
      }
      dispatch({ type: "translate", payload: "229px" });
      setTimeout(() => dispatch({ type: "prev" }), 500);
    }
  }

  const displaySlides = state.viewSlides.map(slide => {
    slide.props.style.transition = "all 0.5s";
    return slide;
  });

  return (
    <div style={slideStyle}>
      <button name="prev" style={previousBtn} onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {displaySlides}
      <button name="next" style={nextBtn} onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
