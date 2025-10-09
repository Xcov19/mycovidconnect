import React from "react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import Login from "./Login";

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Logo />
        <nav className="header-nav d-md-block d-none">
          <Link to="/hospital-registration" className="nav-link">
            Register Hospital
          </Link>
        </nav>
        <div className="d-md-block d-none">
          <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;
