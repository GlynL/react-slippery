import React from "react";
import Slider from "./Slider";
import dog from "./assets/dog.jpg";

const images = [dog, dog, dog, dog, dog, dog, dog, dog, dog, dog, dog];

const App = () => (
  <div className="App">
    <h1>React-Slippery</h1>
    <Slider images={images} />
  </div>
);
export default App;
