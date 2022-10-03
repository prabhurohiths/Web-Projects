import React, { useState } from 'react';


export default function Example() {
  const [text , setText ] = useState("Enter text here ! ");
  // text = " new text " ; // Wrong way to change the state
  // setText ( " new text " ) ; // Correct way to change the state

  
  const handleUpClick = () => {
    // console.log ( " Uppercase was clicked " + text ) ;
    setText (text.toUpperCase())

  }
  const handleDownClick = () => {
    // console.log ( " Uppercase was clicked " + text ) ;
    setText (text.toLowerCase())

  }
  const handlelength = () => {
    // console.log ( " Uppercase was clicked " + text ) ;
    // setText (text.length())
    setText("Length of Entered text is : " + text.length) ; 

  }
  const handleOnChange = (event) => {
      console.log ( " On change " ) ;
      setText(event.target.value) ; 
  }

  return (
    <div>
      <br /><br /><br />
      <textarea onChange = {handleOnChange} value = {text} rows = "8" cols = "100" >
        {text}
      </textarea> 
      <button onClick = {handleUpClick} >Click Here To convert to Uppercase </button>
      <button onClick = {handleDownClick} >Click Here To convert to Lowercase </button>
      <button onClick = {handlelength} >Click Here To convert to get the length of the text </button>
    </div>
  );
}
