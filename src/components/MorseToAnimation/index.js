import React, { useState } from "react";
import { useSpring } from "react-spring";
// import './index.css'


export default function MorseToAnimation({ morseString }) {

   let myVar;
   let time = 0;
   

    const [color,setColor] = useState('')
    const [name, setName ] = useState('type')
    
    const lightBulb = {
        width: "200px",
        height: "200px",
        borderRadius: "50%",
        backgroundColor: color,
        };
        

    function setTheTimeOutGreen(){
        time = time + 20;
        console.log('green')
        myVar = setTimeout( setGreen, time)
        
        time = time + 80;
        myVar = setTimeout( setNull, time)
       
        
       
    }

    function setTheTimeOutPurple(){
        time = time + 20;
        console.log('purple')
        myVar = setTimeout( setPurple, time)
        
        time = time + 280;
        myVar = setTimeout( setNull, time)
       
        
    }

    function setTheTimeOutRed(){
        time = time + 20;
        console.log('red')
        myVar = setTimeout( setRed, time)
        
        time = time + 680;
        myVar = setTimeout( setNull, time)
    }

    function setGreen(){
        setColor('green')
        setName('kort')
    }

    function setPurple(){
        setColor('purple')
        setName('lang')
    }

    function setRed(){
        setColor('red')
        setName('einde')
    }

    function setNull(){
        setColor('white')
    }
    
    
   
  let morseStringCharacters = []
    morseString.map(function (c) {
 
      for (let i = 0; i < c.length; i++) {
     
       morseStringCharacters.push(c[i])
      }
    
  });

 

  function animationStart(){
    
morseStringCharacters.map((char)=>{

    if(char === '.'){
        setTheTimeOutGreen();
       
    }

    if(char === '_') {
        setTheTimeOutPurple()
       
    }
     else if(char === ' ') {
     
        setTheTimeOutRed()
    
    }

})
  }

  // if(c === ".") {setTimeout((color = "green"), 100)})

  //   const animation = [
  //     { name: "short", duration: 0.1, color: "red" },
  //     { name: "long", duration: 0.3, color: "green" },
  //   ];

  return (
    <div>
      <p>hi from MorseToAnimation: {morseString}</p>
      <div style={lightBulb} className={`${color}`}>{name}</div>
      <button onClick={e=>{animationStart()}}>go wild</button>
    </div>
  );
}

// 
