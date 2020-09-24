import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Link to="/">
          <Logo />
        </Link>
        <Nav />
      </div>
    </header>
  );
};

export default Header;
