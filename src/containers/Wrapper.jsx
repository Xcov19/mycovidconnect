 import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Redirect } from 'react-router';
import Home from './Home';

const Wrapper = () =>{
    const { isLoading, isAuthenticated } = useAuth0();
    if(isLoading){
        return <div>Loading</div>
    }
    return(
        <>
        {
            isAuthenticated && <Redirect to={{pathname:"/profile"}}></Redirect>
        }
        {
            !isAuthenticated && <Home />
        }
        </>
    )
}

export default Wrapper;