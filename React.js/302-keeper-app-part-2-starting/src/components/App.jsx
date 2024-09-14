import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  return (
    <div>
      <Header />
      {notes.map(noteItem => (
  <Note
    key={noteItem.id}  // Assuming each noteItem has an `id` field
    title={noteItem.title}
    content={noteItem.content}
  />
))}
      <Footer />
    </div>
  );
}

export default App;
