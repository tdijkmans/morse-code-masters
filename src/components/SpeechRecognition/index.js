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

const urlShort= "https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png"
const urlLong= "https://helpx.adobe.com/content/dam/help/en/stock/how-to/visual-reverse-image-search/jcr_content/main-pars/image/visual-reverse-image-search-v2_intro.jpg"
const urlSpace= "https://image.freepik.com/free-photo/image-human-brain_99433-298.jpg"
const urlOff= "https://cdn-3d.niceshops.com/upload/image/product/large/default/vallejo-game-color-skull-white-17-ml-279423-nl.jpg"


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
  const [name, setName ] = useState('press record to start')
  const [url, setUrl] = useState(urlShort)
  const style = {
    textAlign: 'center',
    backgroundImage: `url(${url})`,
    backgroundColor: 'purple',
    height: '900px',
    
  }
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
    time = time + 980;
    timing = setTimeout(soundOff, time);
  }

  function colorShort() {
    setColor("green");
    setName('.')
    setUrl(urlShort)
  }

  function colorLong() {
    setColor("purple");
    setName('_')
    setUrl(urlLong)
  }

  function colorSpace() {
    setColor("red");
    setName('space')
    setUrl(urlSpace)
  }

  function soundOff() {
    setColor("brown");
    setName(' ')
    setUrl(urlOff)
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
    <div style={style}>
      <h3>Transcript To Morse: {morseString}</h3>
      <MorseToAnimation color={color} name={name} />

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
      <h1>{name}</h1>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
export default SpeechRecognition(options)(Dictaphone);
