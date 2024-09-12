import React, { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [headingText, setHeading] = useState("");

  function HandleChange(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  function HandleClick(){
setHeading(name);
event.preventDefault();
  }

  return (
    <div className="container">
      <h1>Hello {name} </h1>
      <input
        type="text"
        placeholder="What's your name?"
      />
      <button type="submit" onClick={HandleClick}>Submit</button>
    </div>
  );
}

export default App;
