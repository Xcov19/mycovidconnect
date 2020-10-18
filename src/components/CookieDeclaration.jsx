import React from "react";

const cookieDeclaration = ({show}) => {
  if(show){
    return <React.Fragment>
            <script id="CookieDeclaration" src="https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js" type="text/javascript" async></script>
        </React.Fragment>;
  }
  else{
    return(null)
  }
};

export default cookieDeclaration;