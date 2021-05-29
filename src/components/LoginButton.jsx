import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  function login(){
    loginWithRedirect({ appState: { returnTo: (window.location.pathname === "/") ? '/profile' : window.location.pathname } });
  }

  return <button className="btn btn-primary" onClick={() => login()}>{props.name}</button>;
};

export default LoginButton;