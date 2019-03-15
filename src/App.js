import React from "react";
import Slider from "./Slider";
import dog from "./assets/dog.jpg";

const App = () => (
  <div className="App">
    <h1>React-Slippery</h1>
    <Slider images={dog} />
  </div>
);
export default App;
