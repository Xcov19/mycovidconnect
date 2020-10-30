import React, {useState, useEffect} from "react";

const SessionExpiry = () => {

  const defaultTime = 600

  const [timeLeft, setTimeLeft] = useState(defaultTime);
  const [isReset, setIsReset] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(null)
  const [isPopUp, setIsPopUp] = useState(false)

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
      if (isReset) {
        setTimeLeft(defaultTime)
        setIsReset(false)
      } 
    }    
    if(isLoggedIn && (timeLeft > 0)){
      countDown()
    } else if(isLoggedIn && timeLeft <= 0){
      setIsDismissed(false)
      setIsLoggedIn(false)
      setTimeLeft(0)
      window.localStorage.removeItem('authToken')
    }

    if(!isLoggedIn && timeLeft > 0){
      countDown()
    } else if(!isLoggedIn && timeLeft <= 0){
      window.localStorage.removeItem('location')
      setTimeLeft(defaultTime)
    }
  }

  const resetEvent = () => {
    setIsReset(true)
  }

  useEffect(autoLogOut);

  useEffect(() => {
    if(timeLeft < 60){
      setIsPopUp(true)
    }
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft-1)
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  
  useEffect(() => {
    if(timeLeft > 60){
      window.addEventListener("mousemove", resetEvent)
      window.addEventListener("scroll", resetEvent)
    }
    return () => {
      window.removeEventListener('mousemove', resetEvent);
      window.removeEventListener('scroll', resetEvent);
    };
  }, [isPopUp, timeLeft])

  useEffect(() => {
    console.log("remove event", timeLeft)
    window.removeEventListener("mousemove", resetEvent)
    window.removeEventListener("scroll", resetEvent)
  }, [isPopUp])

  if(!isDismissed){
    if(timeLeft < 60 && isLoggedIn){
      return (
        <div className="sessionExpiry">
          <div className="topBar"><span className="topBarButton" onClick={dismiss}>&times;</span></div>
          <div className="warning">Please note that you will be logged off in {displayTime(timeLeft)}</div>
          <button className="sessionExpiryButton  " onClick={() => setIsReset(true)}>Continue session</button>
        </div>
    );

    } else if (!isLoggedIn && isLoggedIn !== null){
      return (
        <div className="sessionExpiry">
          <div className="topBar"><span className="topBarButton" onClick={dismiss}>&times;</span></div>
          <div className="warning">You have been Logged Out</div>
        </div>
      )
    } else if((!isLoggedIn || isLoggedIn === null) && timeLeft < 60){
      return (
        <div className="sessionExpiry">
          <div className="topBar"><span className="topBarButton" onClick={dismiss}>&times;</span></div>
          <div className="warning">Please note that your session is about to expire in {displayTime(timeLeft)}</div>
          <button className="sessionExpiryButton  " onClick={() => setIsReset(true)}>Continue session</button>
        </div>
    );
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
