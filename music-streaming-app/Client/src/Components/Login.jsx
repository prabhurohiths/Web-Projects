import React, {useState, } from "react";
import {Box, TextField, Button} from '@mui/material';
import GoogleButton from 'react-google-button'
import {loginPost} from "../data/api";
import {authenticate} from "../data/authoriseFunctions";
import { Redirect } from "react-router";

function Login(props){
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
        const receivedData = await loginPost({
          email: email,
          password: password
        });
        console.log(receivedData);
        if (receivedData.user.success !== false) {

          authenticate();

          props.setLoggedIn(true);
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
    
   
    return props.loggedIn ? (
      <Redirect to={{ pathname: "/displaySongs" }} />
    ) : (
      <Box className="user-login">
        <Box className="login-box">
          <Box className="form">
            <h1> Log In </h1>
            <a href="https://trusic.herokuapp.com/auth/google">
              <GoogleButton className="gbtn" label="Log In with Google" />
            </a>
            <hr />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              margin="dense"
              fullWidth
              required
              onChange={emailChange}
            />
            <p className="error">{error.emailError}</p>
            <TextField
              label="Password"
              variant="outlined"
              name="password"
              margin="dense"
              type="password"
              fullWidth
              required
              onChange={passwordChange}
            />
            <p className="error">{error.passwordError}</p>
            <Button
              className="submitButton"
              variant="contained"
              fullWidth
              onClick={sendLoginRequest}
            >
              Log in
            </Button>
          </Box>
        </Box>
      </Box>
    );
}

export default Login;