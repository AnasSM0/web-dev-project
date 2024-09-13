import React, { useState } from "react";

function App() {
  const [fName, setFname] = useState("");
  const [lName, setLname] = useState("");

  function UpdateFname(event) {
    const firstName = event.target.value;
    setFname(firstName);
  }

  function UpdateLname(event) {
    const LastName = event.target.value;
    setLname(LastName);
  }
  return (
    <div className="container">
      <h1>
        Hello{fName} {lName}
      </h1>
      <form>
        <input
          onChange={UpdateFname}
          name="fName"
          placeholder="First Name"
          value={fName}
        />
        <input
          onChange={UpdateLname}
          name="lName"
          placeholder="Last Name"
          value={lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
