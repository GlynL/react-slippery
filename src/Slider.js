import React, { useState, useReducer, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const slideStyle = {
  display: "flex",
  alignItems: "center",
  overflow: "hidden",
  scrollBehavior: "smooth",
  height: 129 * 1.5 + "px"
};

const previousBtn = {
  position: "absolute",
  height: "129px"
};

const nextBtn = {
  position: "absolute",
  right: 0,
  height: "129px"
};

function reducer(state, action) {
  switch (action.type) {
    case "next":
      return { ...state, scroll: state.scroll + 229 };
    case "prev":
      return { ...state, scroll: state.scroll - 229 };
    case "disableNext":
      return { ...state, next: true };
    case "disablePrev":
      return { ...state, prev: true };
    case "enableNext":
      return { ...state, next: false };
    case "enablePrev":
      return { ...state, prev: false };
    default:
      return state;
  }
}

export default ({ images }) => {
  const [size, setSize] = useState({ height: 129, width: 229 });

  // stup images into slides

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
        transition: "all 0.5s"
      }}
    >
      {image}
    </div>
  ));

  // scroll page state
  const [state, dispatch] = useReducer(reducer, {
    scroll: 0,
    next: false,
    prev: true
  });

  const sliderRef = useRef(null); /* reference to element to scroll */
  // control slider when state.scroll changes
  // state.scroll actions dispatched by next/prev buttons
  useEffect(() => {
    sliderRef.current.scrollLeft = state.scroll;
    if (state.scroll === 0) dispatch({ type: "disablePrev" });
    if (state.scroll > 0 && state.prev) dispatch({ type: "enablePrev" });
    if (
      sliderRef.current.offsetWidth + state.scroll >=
      slides.length * size.width
    ) {
      dispatch({ type: "disableNext" });
    } else if (state.next) dispatch({ type: "enableNext" });
  }, [state.scroll]);

  return (
    <div style={slideStyle} ref={sliderRef}>
      <button
        style={previousBtn}
        onClick={() => dispatch({ type: "prev" })}
        disabled={state.prev}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {slides}
      <button
        style={nextBtn}
        onClick={() => dispatch({ type: "next" })}
        disabled={state.next}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};
