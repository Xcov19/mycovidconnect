import React from "react";
import Logo from "./Logo";

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <script id="CookieDeclaration" src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js" type="text/javascript" async></script>
        <Logo />
      </div>
      <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="54349014-3934-489b-a905-584bc83272b2" data-blockingmode="auto" type="text/javascript"></script>
    </header>
  );
};

export default Header;
