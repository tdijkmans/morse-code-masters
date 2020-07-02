import React from "react";

import "./App.css";
import SpeechRecognition from "../src/components/SpeechRecognition";
import off from '../src/assets/off.png'

function App() {
  return (
    <div style={{backgroundImage: `url(${off})`}}className="App">
      <SpeechRecognition />
    </div>
  );
}

export default App;
