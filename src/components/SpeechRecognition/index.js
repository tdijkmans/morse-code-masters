import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

import { convertToMorseString } from "../../functions/convertTranscriptToMorseString";
import { convertTranscriptToMorseSound } from "../../functions/convertTranscriptToMorseSound";
import { convertMorseStringToChars } from "../../functions/convertMorseStringToChars";

import { conversionTable } from "../../functions/conversionTable";
import off from "../../assets/off.png";
import between from "../../assets/between.png";
import long from "../../assets/long.png";
import short from "../../assets/short.png";
import low from "../../assets/low.png";
import "./index.css";

// SPEECH RECOGNITION
const options = {
  autoStart: false,
};

const propTypes = {
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
  //ANIMATIONS
  const [color, setColor] = useState("");
  const [nameOfCharPlaying, setNameOfCharPlaying] = useState("");
  const [url, setUrl] = useState(off);
  const [classNameButton, setClassNameButton] = useState("start");
  const [classNamePlayButton, setClassNamePlayButton] = useState("hide");
  const [h3content, setH3Content] = useState(`press 🔴 record to start`);
  const style = {
    textAlign: "center",
    backgroundImage: `url(${url})`,
    backgroundColor: "#222224",
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundSize: "auto",
    margin: "0",
    backgroundPosition: "center",
  };
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const morseString = convertToMorseString(transcript, conversionTable);
  const morseStringCharacters = convertMorseStringToChars(morseString);

  // ANIMATIONS 2
  let timing;
  let time = 0;
  function soundShort() {
    time = time + 80;
    timing = setTimeout(colorShort, time);
    time = time + 180;
    timing = setTimeout(soundOff, time);
  }

  function soundLong() {
    time = time + 80;
    timing = setTimeout(colorLong, time);
    time = time + 380;
    timing = setTimeout(soundOff, time);
  }

  function soundSpace() {
    time = time + 80;
    timing = setTimeout(colorSpace, time);
    time = time + 820;
    timing = setTimeout(soundOff, time);
  }

  function colorShort() {
    setColor("green");
    setNameOfCharPlaying(".");
    setUrl(short);
  }

  function colorLong() {
    setColor("purple");
    setNameOfCharPlaying("_");
    setUrl(long);
  }

  function colorSpace() {
    setColor("red");
    setNameOfCharPlaying("─");
    setUrl(off);
  }

  function soundOff() {
    setColor("brown");
    setNameOfCharPlaying(" ");
  }

  function animationStart() {
    morseStringCharacters.map((char) => {
      if (char === ".") {
        soundShort();
      }
      if (char === "_") {
        soundLong();
      } else if (char === " ") {
        soundSpace();
      }
    });
  }

  function afterRecord() {
    setClassNameButton("hide");
    setClassNamePlayButton("green");
    setH3Content(`press 🟢 to start playing`);
  }

  function animateSOS() {
    const morseSOS = convertToMorseString("SOS", conversionTable);
    const morseStringSOS = convertMorseStringToChars(morseSOS);
    morseStringSOS.map((char) => {
      if (char === ".") {
        soundShort();
      }
      if (char === "_") {
        soundLong();
      } else if (char === " ") {
        soundSpace();
      }
    });
  }

  return (
    <div className="transition" style={style}>
      <button
        onClick={(e) => {
          convertTranscriptToMorseSound("sos");
          animateSOS();
        }}
      >
        Send SOS
      </button>

      <button
        onClick={(e) => {
          startListening();
        }}
      >
        <span>🔴</span> Message
      </button>
      <button
        onClick={(e) => {
          abortListening();
        }}
      >
        ◽ Stop
      </button>

      <button
        onClick={(e) => {
          convertTranscriptToMorseSound(transcript);
          animationStart();
        }}
      >
        ▶ Play
      </button>
      <button onClick={resetTranscript}>Reset</button>

      <h3>{h3content}</h3>

      <h1 className="nameOfCharPlaying" style={{ color: "white" }}>
        {nameOfCharPlaying}
      </h1>

      <h3 className="yourMessage">Your Message: {transcript}</h3>
      <h3 className="inMorse"> In Morse Code: {morseString}</h3>

      <h1
        onClick={(e) => {
          startListening();
          afterRecord();
        }}
        className={`${classNameButton}`}
      >
        🔴
      </h1>

      <h1
        onClick={(e) => {
          convertTranscriptToMorseSound(transcript);
          animationStart();
        }}
        className={`${classNamePlayButton}`}
      >
        🟢
      </h1>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
export default SpeechRecognition(options)(Dictaphone);
