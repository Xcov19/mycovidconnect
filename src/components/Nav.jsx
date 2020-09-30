import React from 'react';

const Nav = () => {
  return (
    <div className="nav">
      <a
        target="_blank"
        href="https://forum.mycovidconnect.com/d/2-about-xcov19-rapid-action-patient-dispatch-solution"
      >
        About
      </a>
      <a href="#">Contact Us</a>
      <button id="login">Log In</button>
      <button id="signup">Sign Up</button>
      {/* <script
        id="CookieDeclaration"
        src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js"
        type="text/javascript"
        async
      ></script> */}
    </div>
  );
};

export default Nav;
