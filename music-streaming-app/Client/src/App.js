

import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import "./App.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Upload from "./Components/Upload"
import SingleUpload from "./Components/SingleUpload";
import MultipleUpload from "./Components/MultipleUpload"
import SongsDisplay from "./Components/SongsDisplay";
import ArtistRegister from "./Components/ArtistRegister";
import ArtistLogin from "./Components/ArtistLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import ArtistOnly from "./Components/ArtistOnly"
import Logout from "./Components/Logout";
import 'react-jinke-music-player/assets/index.css';
import Footer from "./Components/Footer";
import {getUser} from "./data/api";
import {authenticate} from "./data/authoriseFunctions";
function App() {


  const [audioList, Display] = SongsDisplay();
   const [loggedIn, setLoggedIn] = useState(false);
   const [isArtist, setIsArtist] = useState(false);

  
    
  
  return (
    <main className="fill-window">
      <Navbar loggedIn={loggedIn} isArtist={isArtist} setLoggedIn={setLoggedIn} />
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
        
            <Home />
          </Route>
          <Route path="/login">
          
            <Login setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
          <Route path="/signup">
            <Register setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
          </Route>
          <Route path="/artistLogin">
            <ArtistLogin
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              setIsArtist={setIsArtist}
            />
          </Route>
          <Route path="/artistSignup">
            <ArtistRegister
              setLoggedIn={setLoggedIn}
              loggedIn={loggedIn}
              setIsArtist={setIsArtist}
            />
          </Route>
          <ArtistOnly path="/upload">
            <Upload />
          </ArtistOnly>
          <ArtistOnly path="/singleUpload">
            <SingleUpload />
          </ArtistOnly>
          <ArtistOnly path="/multipleUpload">
            <MultipleUpload />
          </ArtistOnly>
          <ProtectedRoute path="/displaySongs" setLoggedIn={setLoggedIn} loggedIn={loggedIn}>
            <Display />
          </ProtectedRoute>
          <Route path="/logout">
            <Logout setLoggedIn={setLoggedIn} />
          </Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </main>
  );
   
}

export default App;