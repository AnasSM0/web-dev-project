import React, { useState } from "react";

function App() {
  const [headingText, setHeadingText] = useState("Hello");
  const [isMousedOver, setMouseOver] = useState(false);

  function HandleClick() {
    setHeadingText("submitted");
  }

  function handleMouseOver() {
    setMouseOver(true);
  }

  function handleMouseOut() {
    setMouseOver(false);
  }

  return (
    <div className="container">
      <h1>Hello</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        style={{ backgroundColor: isMousedOver ? "black" : "white" }}
        onClick={HandleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
