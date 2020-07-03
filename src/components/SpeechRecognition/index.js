import React, { useState } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

import { convertToMorseString } from "../../functions/convertTranscriptToMorseString";
import { convertTranscriptToMorseSound } from "../../functions/convertTranscriptToMorseSound";
import { convertMorseStringToChars } from "../../functions/convertMorseStringToChars";

import { conversionTable } from "../../functions/conversionTable";

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
  const [nameOfCharPlaying, setNameOfCharPlaying] = useState("");
  const [url, setUrl] = useState(low);
  const [classNameButton, setClassNameButton] = useState("start");
  const [classNamePlayButton, setClassNamePlayButton] = useState("hide");
  const [h3content, setH3Content] = useState(`press 🔴 record to start`);
  const [answer, setAnswer] = useState(
    "Vessel in distress! Captain, your vessel is caught in a wild storm and flooding quickly. Call for help to save you and your crew from drowning. But SOS gives no response! Hurry, send the right message to save our souls!"
  );

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
  let transitionTime = 20;
  function animateShort() {
    time = time + 80 - transitionTime;
    timing = setTimeout(displayShort, time);
    time = time + transitionTime;
    timing = setTimeout(displayBetween, time);
    time = time + 180;
    timing = setTimeout(displaySpace, time);
  }

  function animateLong() {
    time = time + 80 - transitionTime;
    timing = setTimeout(displayLong, time);
    time = time + transitionTime;
    timing = setTimeout(displayBetween, time);
    time = time + 380;
    timing = setTimeout(displaySpace, time);
  }

  function animateSpace() {
    time = time + 80 - transitionTime;
    timing = setTimeout(displaySpace, time);
    time = time + transitionTime;
    timing = setTimeout(displayBetween, time);
    time = time + 820;
    timing = setTimeout(displaySpace, time);
  }

  function displayShort() {
    setNameOfCharPlaying(".");
    setUrl(short);
  }

  function displayLong() {
    setNameOfCharPlaying("_");
    setUrl(long);
  }

  function displayBetween() {
    setUrl(between);
  }

  function displaySpace() {
    setNameOfCharPlaying("-");
    setUrl(low);
  }

  function animationStart() {
    morseStringCharacters.map((char) => {
      if (char === ".") {
        animateShort();
      }
      if (char === "_") {
        animateLong();
      } else if (char === " ") {
        animateSpace();
      }
    });
  }

  function afterRecord() {
    setClassNameButton("hide");
    setClassNamePlayButton("green");
    setH3Content(`press ▶ to start playing`);
  }

  function pageRefresh() {
    window.location.reload();
  }

  function respondToMessage() {
    console.log("time", time);
    const magicWord = "please";
    const messageResponse = {
      right:
        "Well done, captain! You have made it ashore and save many lives from certain death.",
      wrong: "No response, nothing happens! Try another 'magic word'!",
    };
    if (transcript === magicWord) {
      setAnswer(messageResponse.right);
    } else {
      setAnswer(messageResponse.wrong);
    }
  }

  function checkAnswer() {
    setTimeout(respondToMessage, time + 100);
    setTimeout(pageRefresh, time + 5000);
  }

  function animateSOS() {
    const morseSOS = convertToMorseString("SOS", conversionTable);
    const morseStringSOS = convertMorseStringToChars(morseSOS);
    morseStringSOS.map((char) => {
      if (char === ".") {
        animateShort();
      }
      if (char === "_") {
        animateLong();
      } else if (char === " ") {
        animateSpace();
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
        <span role="img">🔴</span> Message
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
          abortListening();
        }}
      >
        ▶ Play
      </button>
      <button onClick={pageRefresh}>Reset</button>

      <h3>{h3content}</h3>

      {/* <h1 className="nameOfCharPlaying" style={{ color: "white" }}>
        {nameOfCharPlaying}
      </h1> */}

      <h3 className="yourMessage">Your Message: {transcript}</h3>
      <h3 className="inMorse"> In Morse Code: {morseString}</h3>

      <h1
        onClick={(e) => {
          startListening();
          afterRecord();
        }}
        className={`${classNameButton}`}
      >
        <span role="img">🔴</span>
      </h1>

      <h1
        onClick={(e) => {
          convertTranscriptToMorseSound(transcript);
          abortListening();
          animationStart();
          checkAnswer();
        }}
        className={`${classNamePlayButton}`}
      >
        <span className="greenButton" role="img">
          ▶
        </span>
      </h1>

      <div
        style={{
          marginTop: "500px",
          width: "500px",
          marginLeft: "820px",
          color: "white",
          textAlign: "right",
          lineHeight: "2.5em",
          position: "relative",
        }}
      >
        <h2>{answer}</h2>
      </div>
    </div>
  );
};

Dictaphone.propTypes = propTypes;
export default SpeechRecognition(options)(Dictaphone);
