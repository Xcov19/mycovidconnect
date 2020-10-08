import React, {useState, useEffect} from "react";

const SessionExpiry = () => {
  const [timeLeft, setTimeLeft] = useState(600);
  const [isReset, setIsReset] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isDismissed, setIsDismissed] = useState(false)

  const dismiss = () => {
    setIsDismissed(true)
  }

  const displayTime = (timeLeft) => {
    const hh = Math.floor(timeLeft/60);
    const mm = `${Math.floor(timeLeft % 60)}`.padStart(2, "0");   
    return `${hh}:${mm}`;
  }

  const autoLogOut = () => {
    const countDown = () => {
      if(isReset){
        setTimeLeft(600)
        setIsReset(!isReset)
      } else {
        setTimeLeft(timeLeft-.1)
      }
    }
    if(isLoggedIn && timeLeft > 0){
      setTimeout(() => {
        countDown();
      },100)
    } else if(isLoggedIn && timeLeft <= 0){
      setIsDismissed(false)
      setIsLoggedIn(false)
      setTimeLeft(0)
    }
  }

  useEffect(autoLogOut);

  if(!isDismissed){
    if(timeLeft < 60 && isLoggedIn){
      return (
        <div className="sessionExpiry">
          <div className="topBar"><span className="topBarButton" onClick={dismiss}>&times;</span></div>
          <div className="warning">Please note that your session is about to expire in {displayTime(timeLeft)}</div>
          <button className="sessionExpiryButton  " onClick={() => setIsReset(!isReset)}>Continue session</button>
        </div>
    );

    } else if (!isLoggedIn){
      return (
        <div className="sessionExpiry">
          <div className="topBar"><span className="topBarButton" onClick={dismiss}>&times;</span></div>
          <div className="warning">You have been Logged Out</div>
        </div>
      )
    } else {
      return (
        null
      )
    }
  } else {
    return null
  }
};

export default SessionExpiry;
