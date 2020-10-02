import CookieConsent from "react-cookie-consent";
import React from "react";




const Cookie = () => {
  return (
    <div className = "cookie">
      <CookieConsent
        location="bottom"
        buttonText="Accept"
        cookieName="cookieName"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        expires={150}
      >
      This website uses cookies to enhance the user experience.{" "}
      </CookieConsent>
    </div>
  );
}

export default Cookie;