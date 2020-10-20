import React from "react";

const CookieDeclaration = ({ show }) => {
  if (show) {
    // return <React.Fragment>
    //   <script id="CookieDeclaration" src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js" type="text/javascript" async></script>
    // </React.Fragment>;
    return (
      <>
        <div style={{
          width: "500px",
          height: "500px",
          top: "0",
          left: "0",
          bottom: "0",
          right: "0",
          margin: "auto",
          backgroundColor: "red",
          position: "absolute"
        }}
        >
          CookieDeclaration Popup
        </div>
        <script id="CookieDeclaration" src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js" type="text/javascript" async></script>
      </>
    )
  }
  else {
    return (null)
  }
};

export default CookieDeclaration;