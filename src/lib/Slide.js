import React, { useState } from "react";

export default ({ size, image, transition, translate }) => {
  // state for hover
  const [hovered, setHovered] = useState(false);
  const [hoverTransition, setTransition] = useState(false);
  // destructure prop
  const { height, width } = size;
  // set transition-duration
  const animationRate = 300;

  return (
    <div
      className="slide"
      // styling based on state/props
      style={{
        height: `${hovered ? height * 2 : height}px`,
        width: `${hovered ? width * 2 : width}px`,
        // hoverTransition separate as needs a delay to
        transition: hoverTransition
          ? `width ${animationRate}ms, height ${animationRate}ms`
          : transition,
        transform: `translateX(${translate})`
      }}
      onMouseEnter={() => {
        setHovered(true);
        setTransition(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setTimeout(() => setTransition(false), animationRate);
      }}
    >
      {image}
    </div>
  );
};
