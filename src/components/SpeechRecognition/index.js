import React from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
import MorseToSound from "../MorseToSound";
import TranscriptToMorseCharacters from "../TranscriptToMorseCharacters";

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

  return (
    <div>
      <button onClick={resetTranscript}>Reset</button>
      <MorseToSound
        transcript={transcript}
        abortListen={abortListening}
        startListen={startListening}
      />
      <h3>Transcript: {transcript}</h3>
      <TranscriptToMorseCharacters transcript={transcript} />
    </div>
  );
};

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(options)(Dictaphone);
