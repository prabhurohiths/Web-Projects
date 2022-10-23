import React, { useEffect } from "react";
import {unauthenticate} from "../data/authoriseFunctions";
import { Redirect } from 'react-router-dom';
function Logout(props){
 
useEffect(() => {
    props.setLoggedIn(false);
    unauthenticate();
   
}, [])
    return <Redirect to={{pathname:"/login"}}></Redirect>
}

export default Logout;