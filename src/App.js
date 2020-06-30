import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SpeechRecognition from "../src/components/SpeechRecognition";
import TextToMorse from "../src/components/TextToMorse";

function App() {
  return (
    <div className="App">
      <SpeechRecognition />
     
    </div>
  );
}

export default App;
