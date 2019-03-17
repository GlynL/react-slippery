import React from "react";
import Slider from "./Slider";
import dog from "./assets/dog.jpg";
import cat from "./assets/cat.jpg";

const images = [
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog,
  cat,
  dog
];

const App = () => (
  <div className="App">
    <h1>React-Slippery</h1>
    <Slider images={images} />
  </div>
);
export default App;
