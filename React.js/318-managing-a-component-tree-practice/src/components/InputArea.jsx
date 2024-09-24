import React from "react";

function InputArea(props) {
  
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems(prevItems => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={props.inputText} />
      <button onClick={addItem}>
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
