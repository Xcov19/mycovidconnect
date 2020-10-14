import React from "react";
import Logo from "./Logo";
import SessionExpiry from "./SessionExpiry.jsx"
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <SessionExpiry/>
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;

