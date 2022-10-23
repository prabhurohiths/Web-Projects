import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute (props) {

    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const Rendering = isAuthenticated === 'Yes' ? props.children : <Redirect to={{pathname:'/login'}}></Redirect>

    return (
      <Route path={props.path}> 
        {Rendering}
      </Route>
    )
}

export default ProtectedRoute;