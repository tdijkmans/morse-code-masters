import React from "react";

export default function TranscriptToMorseCode(props) {
  // morsecode
  var code = {
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
  let MorseCodeToDisplay = [];
  // generate code for text
  function makecode(data) {
    for (var i = 0; i <= data.length; i++) {
      var codedata = data.substr(i, 1).toLowerCase();

      codedata = code[codedata];
      MorseCodeToDisplay.push(codedata);
      // recognised character
    }
    console.log(MorseCodeToDisplay);
    return MorseCodeToDisplay;
  }

  return <h3>{makecode(props.transcript)}</h3>;
}
