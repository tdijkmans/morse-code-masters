import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import MorseToSound from "../MorseToSound";

import MorseToAnimation from '../MorseToAnimation'
import { func1, func2 } from "../functions";

const options = {
  autoStart: false,
};

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool,
  abortListening: PropTypes.func,
  startListening: PropTypes.func,
};

const Dictaphone = ({
  transcript,
  resetTranscript,
  browserSupportsSpeechRecognition,
  abortListening,
  startListening,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  var conversionTable = {
    a: "._",
    b: "_...",
    c: "_._.",
    d: "_..",
    e: ".",
    f: ".._.",
    g: "__.",
    h: "....",
    i: "..",
    j: ".___",
    k: "_._",
    l: "._..",
    m: "__",
    n: "_.",
    o: "___",
    p: ".__.",
    q: "__._",
    r: "._.",
    s: "...",
    t: "_",
    u: ".._",
    v: "..._",
    w: ".__",
    x: "_.._",
    y: "_.__",
    z: "__..",
    0: "_____",
    1: ".____",
    2: "..___",
    3: "...__",
    4: "...._",
    5: ".....",
    6: "_....",
    7: "__...",
    8: "___..",
    9: "____.",
    }; 

    function convertToMorse(transcript) {
      let morseString = [];
      for (var i = 0; i <= transcript.length; i++) {
      let toConvertChar = transcript.substr(i, 1).toLowerCase();
      
      let convertedChar = conversionTable[toConvertChar];
      if (convertedChar === undefined) {
      convertedChar = " ";
      }
      
      morseString.push(convertedChar);
      // recognised character
      }
      
      return morseString;
      } 

      const morseString = convertToMorse(transcript); 

      function startFunctions(){
        func1();
        func2();
      }

  return (
    
    <div>

    <h3>Transcript To Morse: {morseString}</h3>
    <MorseToAnimation morseString={morseString} /> 

    <button onClick={e=>startFunctions()}></button>

      <button onClick={resetTranscript}>Reset</button>
      <MorseToSound
        transcript={transcript}
        abortListen={abortListening}
        startListen={startListening}
      />
      <h3>Transcript: {transcript}</h3>
     
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
