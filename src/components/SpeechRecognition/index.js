import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

import { convertToMorseString } from "../../functions/convertTranscriptToMorseString";
import { convertTranscriptToMorseSound } from "../../functions/convertTranscriptToMorseSound";
import { convertMorseStringToChars } from "../../functions/convertMorseStringToChars";

import MorseToAnimation from "../MorseToAnimation";
import { conversionTable } from "../../functions/conversionTable";

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
  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const morseString = convertToMorseString(transcript, conversionTable);
  const morseStringCharacters = convertMorseStringToChars(morseString);

  // ANIMATIONS 2
  let timing;
  let time = 0;
  function soundShort() {
    time = time + 20;
    timing = setTimeout(colorShort, time);
    time = time + 80;
    timing = setTimeout(soundOff, time);
  }

  function soundLong() {
    time = time + 20;
    timing = setTimeout(colorLong, time);
    time = time + 280;
    timing = setTimeout(soundOff, time);
  }

  function soundSpace() {
    time = time + 20;
    timing = setTimeout(colorSpace, time);
    time = time + 680;
    timing = setTimeout(soundOff, time);
  }

  function colorShort() {
    setColor("green");
  }

  function colorLong() {
    setColor("purple");
  }

  function colorSpace() {
    setColor("red");
  }

  function soundOff() {
    setColor("white");
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

  return (
    <div>
      <h3>Transcript To Morse: {morseString}</h3>
      <MorseToAnimation color={color} />

      <button onClick={resetTranscript}>Reset</button>
      <button
        onClick={(e) => {
          convertTranscriptToMorseSound(transcript);
          animationStart();
        }}
      >
        Play it!
      </button>

      <button
        onClick={(e) => {
          convertTranscriptToMorseSound("sos");
        }}
      >
        SOS Test
      </button>
      <button
        onClick={(e) => {
          startListening();
        }}
      >
        Record
      </button>
      <button
        onClick={(e) => {
          abortListening();
        }}
      >
        Stop Record
      </button>

      <h3>Transcript: {transcript}</h3>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
export default SpeechRecognition(options)(Dictaphone);
