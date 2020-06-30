import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'


export default function LightHouse({bla,morseChar}) {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const isShort = true;
    

    const props = useSpring({
        
        opacity: isOpen ? 0: 1,
        transitionDuration: isShort ? "0.1s" : "3.0s",
                             
    
    }) 
    function morseCharLoaded(){
    
   
    
}
    
    return (
        <div>
            <button onClick={e=>toggle()}>toggle</button>
            <animated.div style={props}>i will fade</animated.div> 
            <span>{bla}</span>
        {morseChar}
        </div>
    )
}
