import React from "react";

export default function MorseToSound(props) {
  var globalAudioContext = new window.AudioContext();

  function morsecode(text, unit, freq) {
    // defaults
    unit = unit ? unit : 0.1;
    freq = freq ? freq : 50;
    var cont = globalAudioContext;
    var time = cont.currentTime;

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

    // generate code for text
    function makecode(data) {
      for (var i = 0; i <= data.length; i++) {
        var codedata = data.substr(i, 1).toLowerCase();

        codedata = code[codedata];

        // recognised character
        if (codedata !== undefined) {
          maketime(codedata);
        }
        // unrecognised character
        else {
          time += unit * 7;
        }
      }
    }

    // generate time for code
    function maketime(data) {
      for (var i = 0; i <= data.length; i++) {
        var timedata = data.substr(i, 1);
        timedata = timedata === "." ? 1 : timedata === "_" ? 3 : 0;

        timedata *= unit;
        if (timedata > 0) {
          maketone(timedata);

          time += timedata;
          // tone gap
          time += unit * 1;
        }
      }
      // char gap
      time += unit * 2;
    }

    // generate tone for time
    function maketone(data) {
      var start = time;
      var stop = time + data;

      // filter: envelope the tone slightly
      gain.gain.linearRampToValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(1, start + unit / 8);
      gain.gain.linearRampToValueAtTime(1, stop - unit / 16);
      gain.gain.linearRampToValueAtTime(0, stop);
      // toggle achtergrond rood
    }

    // create: oscillator, gain, destination
    var osci = cont.createOscillator();
    osci.frequency.value = freq;
    var gain = cont.createGain();
    gain.gain.value = 0;
    var dest = cont.destination;
    // connect: oscillator -> gain -> destination
    osci.connect(gain);
    gain.connect(dest);
    // start oscillator
    osci.start(time);

    // begin encoding: text -> code -> time -> tone
    makecode(text);

    // return web audio context for reuse / control
    return cont;
  }

  return (
    <>
      <div>Hello from Morse</div>

      <button
        onClick={(e) => {
          morsecode("sos");
        }}
      >
        SOS Test
      </button>
      <button
        onClick={(e) => {
          props.startListen();
        }}
      >
        Record
      </button>
      <button
        onClick={(e) => {
          props.abortListen();
        }}
      >
        Stop Record
      </button>
      <button
        onClick={(e) => {
          morsecode(props.transcript);
        }}
      >
        Play Morse Code Sound
      </button>
    </>
  );
}