import React from "react";
import { NavLink } from "react-router-dom";

const Account = ({ showDropDown, toggleDropDown }) => {
  return (
    <div className="account">
      <div className="get-started">
        <NavLink to="/get-started" activeclass="active" title="Get Started">
          Get Started
        </NavLink>
      </div>
      <div className="account-area">
        <div className="account-area-link">
          <div className="account-area-title">Username</div>
          <div className="account-area-icon" onClick={toggleDropDown}>
            <i className="fas fa-user"></i>
          </div>
        </div>
        <div
          className={
            showDropDown ? `account-area-list show` : `account-area-list`
          }
        >
          <ul>
            <li>
              <NavLink to="/profile" activeclass="active" title="profile">
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/history" activeclass="active" title="profile">
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/account-settings"
                activeclass="active"
                title="profile"
              >
                Account Settings
              </NavLink>
            </li>
            <li>
              <NavLink to="/more-options" activeclass="active" title="profile">
                More Options...
              </NavLink>
            </li>
            <li>
              <button title="profile">Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Account;
