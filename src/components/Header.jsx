import React from "react";
import Logo from "./Logo";
import SessionExpiry from "./SessionExpiry.jsx"

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Logo />
        <SessionExpiry/>
      </div>
    </header>
  );
};

export default Header;
