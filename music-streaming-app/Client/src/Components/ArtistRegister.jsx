import React, {useState} from "react";
import {Box, Button, TextField} from '@mui/material';
import {artistSignupPost} from "../data/api";
import {authenticateArtist} from "../data/authoriseFunctions";
import { Redirect } from "react-router";

function ArtistRegister(props){
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [phone, setPhone] = useState("");
const [name, setName] = useState("");

  const emailChange = (event) => {
    setEmail(event.target.value);
  }
  const passwordChange = (event) => {
    setPassword(event.target.value);
  }
  const sendSignupRequest = async () => {
console.log({name, phone, email, password});
        await artistSignupPost({name, phone, email, password});
        console.log("signing up as artist done");
        authenticateArtist();
        props.setLoggedIn(true);
        props.setIsArtist(true);
    }
  
    return props.loggedIn ? <Redirect to={{pathname: "/displaySongs"}}/> : <Box className="artist-signup">
      <Box>
        <Box className="form signup-box" >
          <h2> Upload your Music with us! </h2> 
          <TextField id="name" label="Full Name" variant="outlined" name="name" margin="dense" fullWidth required value={name} onChange={(event) => {setName(event.target.value);}}/>
          <TextField id="phone" type="tel" label="Phone Number" variant="outlined" name="phone" margin="dense" fullWidth required value={phone} onChange={(event) => {setPhone(event.target.value);}}/>
          <TextField id="email" label="Email" variant="outlined" name="email" margin="dense" fullWidth required value={email} onChange={emailChange}/>
          <TextField id="password" label="Password" variant="outlined" name="password" margin="dense" type="password" fullWidth required value={password} onChange={passwordChange}/>
          <Button className="submitButton" onClick={sendSignupRequest} variant="contained" fullWidth>
            Register
          </Button>
          <p className="or-text">Or</p>
          <a href="/artistLogin">
          <Button className="login-button" variant="contained" fullWidth>
            Log In as An Artist
          </Button>
          </a>
        </Box>
        
    </Box>
  
    </Box>
}

export default ArtistRegister;