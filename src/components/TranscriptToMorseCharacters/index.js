import React from "react";
import MorseToAnimation from "../MorseToAnimation";

export default function TranscriptToMorseCharacters(props) {
  // morsecode
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

  // generate code for text
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

  const morseString = convertToMorse(props.transcript);

  return (
    <>
      <h3>Transcript To Morse: {morseString}</h3>
      <MorseToAnimation morseString={morseString} />
    </>
  );
}
