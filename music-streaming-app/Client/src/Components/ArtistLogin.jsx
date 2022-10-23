import React, {useState} from "react";
import {Box, TextField, Button} from '@mui/material';
import {authenticateArtist} from "../data/authoriseFunctions";
import {artistLoginPost} from "../data/api";
import { Redirect } from "react-router";

function ArtistLogin(props){
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState({emailError: "", passwordError: ""});
  
  
  const emailChange = (event) => {
    setEmail(event.target.value);
  }
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }
  const sendLoginRequest = async () => {
        const receivedData = await artistLoginPost({email, password});
        console.log(receivedData);

        if(receivedData.message === "Not an artist") {
          setError({emailError: "The user with this email is not registered as an Artist."})
        }
        else if (receivedData.user.success !== false) {
          authenticateArtist();
           props.setLoggedIn(true);
          props.setIsArtist(true);
        }
        else {
          console.log(receivedData.user.message);
          if (receivedData.user.message === "Incorrect email") {
            setError({emailError: "No user found with this email"})
          }
          if (receivedData.user.message === "Incorrect password") {
            setError({passwordError: "Incorrect Password. Please try again."})
          }
        }
        
       
    }
  
    return props.loggedIn ? <Redirect to={{pathname: "/displaySongs"}}/> : <Box className="artist-login">
      <Box className= "login-box container">
        <Box className="form">
          <h1> Log In as an Artist </h1> 
          <TextField label="Email" variant="outlined" name="email" margin="dense" fullWidth required onChange={emailChange}/>
          <p className="error">{error.emailError}</p>
          <TextField label="Password" variant="outlined" name="password" margin="dense" type="password" fullWidth required onChange={passwordChange}/>
          <p className="error">{error.passwordError}</p>
          <Button className="submitButton" variant="contained" fullWidth onClick={sendLoginRequest}>
            Log in
          </Button>
        </Box>
    </Box>
    </Box> 
 
    
    
    
    
    
}

export default ArtistLogin;