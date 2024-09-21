import React, { useState } from "react";

function ToDoItem(props) {

  const [currentState, setState] = useState(false);

  function handleState() {
    setState((prevValue) => {
      return !prevValue;
    });
  }
  return (
  <div onClick={handleState}>
   <li style={{textDecoration : currentState ? "line-through" : "none"}}>{props.text}</li>
  </div>
  )
}

export default ToDoItem;
