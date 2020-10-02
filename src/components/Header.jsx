import React from "react";
import Logo from "./Logo";
import Cookie from "./Cookie";



const Header = () => {
  return (
    <header>
      <div className="headerin">
      <Logo />
      </div>
      <div>
      <Cookie/>
      </div>
    </header>
  );
};



export default Header;
