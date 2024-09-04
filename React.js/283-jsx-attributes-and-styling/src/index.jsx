import React from "react";
import ReactDOM from "react-dom";

ReactDOM.render(
  <div>
    <h1>My Favourite Foods</h1>
    <ul>
      <li><img className="foodimg" src="noodles.jpg"></img></li>
      <li><img className="foodimg" src="jamon.jpg"></img></li>
      <li><img className="foodimg" src="bacon.jpg"></img></li>
    </ul>
  </div>,
  document.getElementById("root")
);

// If you're running this locally in VS Code use the commands:
// npm install
// to install the node modules and
// npm run dev
// to launch your react project in your browser
