import React from "react";

export default function MorseToAnimation({ color }) {
  const lightBulb = {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    backgroundColor: color,
  };

  return (
    <div>
      <div style={lightBulb}></div>
    </div>
  );
}

//
