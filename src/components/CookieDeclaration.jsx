import React from "react";

const cookieDeclaration = ({ show }) => {
  if (show) {

    const script = document.createElement('script');

    script.src = "https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js";
    script.async = true;

    document.getElementById("cookieData").appendChild(script);



    // return <React.Fragment>
    //   <script id="CookieDeclaration" src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js" type="text/javascript" async></script>
    // </React.Fragment>;
  }
  else {
    // return (null)
  }

  return (
    <div style={{
      width: show ? "500px" : "0",
      height: show ? "500px" : "0",
      left: "0",
      top: "0",
      bottom: "0",
      right: "0",
      margin: "auto",
      position: "absolute",
      backgroundColor: "white",
      overflow: "auto"
    }} id="cookieData"></div>
  )
};

export default cookieDeclaration;