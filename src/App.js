import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SpeechRecognition from "../src/components/SpeechRecognition";
import TextToMorse from "../src/components/TextToMorse";
import LightHouse from './components/LightHouse'

function App() {
  return (
    <div className="App">
      <SpeechRecognition />
      <LightHouse />
     
    </div>
  );
}

export default App;
