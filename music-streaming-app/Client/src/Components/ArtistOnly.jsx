import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ArtistOnly (props) {

    const isAuthenticated = localStorage.getItem('isArtist');
    const Rendering = isAuthenticated === 'Yes' ? 
    props.children : <Redirect to={{pathname:'/artistLogin'}}></Redirect>
    
    return (
      <Route path={props.path}> 
        {Rendering}
      </Route>
    )
}

export default ArtistOnly;