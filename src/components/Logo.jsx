import React from "react";
import LogoImg from "../img/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
  <Link to="/">
    <img className="logo" src={LogoImg} />
    </Link>
  )
};

export default Logo;
