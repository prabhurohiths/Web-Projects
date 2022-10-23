import React, {useEffect, useState} from "react";
import {AppBar, Box, Button} from '@mui/material';
import {unauthenticate} from "../data/authoriseFunctions";




function Navbar(props){
  const [isActive, setActive] = useState(false);
  

  
  const toggleClass = () => {
    setActive(!isActive);
  }
  const closeMenu = () => {
    setActive(false);
  }
  
  
  useEffect(() => {
  // setIsAuthenticated(localStorage.getItem('isAuthenticated'));
  // setIsArtist(localStorage.getItem('isArtist'));
  
  }, [])
  console.log("Navbar loading state:" + props.loggedIn);
  
return <AppBar position="static" className="nav">
      <nav className="nav shift">
      <a href="/">  <h1 className="brand-name"> <img src="/trusic-logo.png" alt="Logo" className="logo" /> Trusic </h1></a>

      <ul className={isActive ? "nav-links active" : "nav-links"}>

      {props.loggedIn ?  <> 
      {props.isArtist ? <li className="nav-item"><a className="nav-link" onClick={closeMenu} href="/upload">Upload</a></li> :
      null }
      <li className="nav-item"><a className="nav-link" onClick={closeMenu} href="/displaySongs">Music Player</a></li>
      <li className="nav-item"><a className="nav-link" onClick={() => {closeMenu(); unauthenticate(); props.setLoggedIn(false);}} href="/logout">Log Out</a></li>
      </> : <> 
      <li className="nav-item"><a className="nav-link" onClick={closeMenu} href="/artistSignup">Artist Space</a></li>
      <li className="nav-item"><a className="nav-link" onClick={closeMenu} href="/login">Log in</a></li>
      <li className="nav-item"><a className="nav-link signup-nav" onClick={closeMenu} href="/signup">
      <Button className="signup-btn" variant="contained">Sign Up</Button>
      </a></li> </> } 
      
      </ul>
      <Box className={isActive ? "hamburger active" : "hamburger"} onClick={toggleClass} >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
      </Box>
      
      </nav>
    </AppBar>

}

export default Navbar;