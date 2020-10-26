import React,{useState,useEffect} from "react";
import CookieDeclaration from "../components/CookieDeclaration";

const Footer = (props) => {
  const [show,setShow] = useState(false);

  useEffect(() => {
    var src= "https://consent.cookiebot.com/54349014-3934-489b-a905-584bc83272b2/cd.js"
    var cd = document.querySelector('script[src="' + src + '"]');
    if(cd != null){
    }else{
      setShow(false);
    }
  },[show]);

  const showModal = (e) => {
    e.preventDefault();
    setShow(true);
    return false;
  }
  return (
    <>
      <footer>
        <div className="footerin">
          <div className="w40">
            <h3>Join Our Community</h3>
            <a
              target="_blank"
              rel='noreferrer noopener'
              href="https://forum.mycovidconnect.com/"
              title="Join Now"
            >
              <button>Join Now</button>
            </a>
          </div>
          <div className="w30">
            <div className="links">
              <a
                target="_blank"
                rel='noreferrer noopener'
                href="https://forum.mycovidconnect.com/d/2-about-xcov19-rapid-action-patient-dispatch-solution"
              >
                About XCOV19
              </a>
              <a
                href="mailto:reachout@mycovidconnect.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </a>
              <a
                target="_blank"
                rel='noreferrer' 
                href="/" onClick = {showModal}>Privacy Policy</a>
            </div>
            <div className="media-links">
              <div className="first-row">
                <a href="https://hacktoberfest.cloud.mattermost.com/main/channels/mlh-4616">
                  <img
                    src={
                      'https://d2vgampz89jm7o.cloudfront.net/_Sponsors+Light+Boxed+2.svg'
                    }
                    alt="hacktoberfest-sponsors-logo"
                  />
                </a>
                <a href="https://app.mattermore.io/matters/TWF0dGVyOjky/xcov19-rapid-action-patient-dispatch-solution-for-covid-19">
                  <img
                    src={
                      'https://d2vgampz89jm7o.cloudfront.net/mattermore_logo.jpeg'
                    }
                    alt="mattermore-logo"
                    id="square"
                  />
                </a>
              </div>
              <div className="second-row">
                <a href="https://helpful.directory/projects/HE-1594886592000">
                  <img
                    src={
                      'https://d2vgampz89jm7o.cloudfront.net/helpful-engineering-logo-1.png'
                    }
                    alt="helpful-logo"
                  />
                </a>
                <a href="https://app.jogl.io/project/251/about">
                  <img
                    src={'https://d2vgampz89jm7o.cloudfront.net/JOGL_logo.png'}
                    alt="jogl-logo"
                    id="square"
                  />
                </a>
              </div>
              <CookieDeclaration show={show}/>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
