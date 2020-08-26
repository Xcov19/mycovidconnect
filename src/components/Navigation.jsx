import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeclass="active" title="Home">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" exact activeclass="active" title="About">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" exact activeclass="active" title="Contact Us">
            Contact Us
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
