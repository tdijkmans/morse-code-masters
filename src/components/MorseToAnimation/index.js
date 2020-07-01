import React from "react";
import { useSpring } from "react-spring";

export default function MorseToAnimation({ morseString }) {
  morseString.map(function (c) {
    if (c !== undefined) {
      for (let i = 1; i < c.length; i++) {
        if (c === ".") {
          setTimeout(console.log("short"), 100);
        } else if (c === "_") {
          setTimeout(console.log("long"), 300);
        } else {
          console.log("undefined");
        }
      }
    }
  });

  // if(c === ".") {setTimeout((color = "green"), 100)})

  //   const animation = [
  //     { name: "short", duration: 0.1, color: "red" },
  //     { name: "long", duration: 0.3, color: "green" },
  //   ];

  return (
    <div>
      <p>hi from MorseToAnimation: {morseString}</p>
      <div>Flashy</div>
    </div>
  );
}

// style={{ backgroundColor: `${color}` }}
