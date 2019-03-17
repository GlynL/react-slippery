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
        translate: "0",
        transition: "none"
      };
    case "prev":
      return {
        ...state,
        translate: "0",
        transition: "none"
      };
    case "translate":
      return { ...state, translate: action.payload, transition: "all 0.5s" };
    case "slideChange":
      return { ...state, viewImages: action.payload };

    case "setImages":
      return { ...state, images: action.payload };
    default:
      return state;
  }
}

export default ({ images }) => {
  const [size, setSize] = useState({ height: 129, width: 229 });

  const [state, dispatch] = useReducer(reducer, {
    translate: "0",
    images: [],
    viewImages: []
  });

  // setup images into slides
  useEffect(() => {
    const styledImages = images.map((image, idx) => (
      <img
        // use es6 unique thing?
        key={idx}
        src={image}
        alt="dog"
        style={{ height: `${size.height}px`, width: `${size.width}px` }}
      />
    ));

    dispatch({ type: "setImages", payload: styledImages });
  }, []);

  useEffect(() => {
    const payload = state.images.slice(0, 10);
    dispatch({ type: "slideChange", payload });
  }, [state.translate, state.images]);

  function handleClick(e) {
    const type = e.target.name;
    if (type === "next") {
      const copy = [...state.images];
      copy.push(copy.shift());

      dispatch({ type: "translate", payload: "-229px" });
      setTimeout(() => {
        dispatch({ type: "setImages", payload: copy });
        dispatch({ type: "next" });
      }, 500);
    }
    if (type === "prev") {
      const copy = [...state.images];
      copy.unshift(copy.pop());
      dispatch({ type: "translate", payload: "229px" });
      setTimeout(() => {
        dispatch({ type: "setImages", payload: copy });
        dispatch({ type: "prev" });
      }, 500);
    }
  }

  const slides = state.viewImages.map(image => (
    <div
      key={"slide" + image.key}
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

  return (
    <div style={slideStyle}>
      <button name="prev" style={previousBtn} onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {slides}
      <button name="next" style={nextBtn} onClick={handleClick}>
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
