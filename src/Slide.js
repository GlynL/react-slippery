import React, { useState } from "react";

export default ({ size, image, transition, translate }) => {
  const [hovered, setHovered] = useState(false);
  const [hoverTransition, setTransition] = useState(false);
  const { height, width } = size;
  return (
    <div
      className="slide"
      style={{
        height: `${hovered ? height * 2 : height}px`,
        width: `${hovered ? width * 2 : width}px`,
        transition: hoverTransition ? "width 0.5s, height 0.5s" : transition,
        transform: `translateX(${translate})`
      }}
      onMouseEnter={() => {
        setHovered(true);
        setTransition(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        setTimeout(() => setTransition(false), 500);
      }}
    >
      {image}
    </div>
  );
};
