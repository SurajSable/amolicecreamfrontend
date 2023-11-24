import React from "react";
import Typewriter from 'typewriter-effect';
const Jmbotron=({text})=>{
    return(
        <Typewriter
  options={{
    strings: text,
    autoStart: true,
    loop: true,
  }}
/>
    )
}

export default Jmbotron;