import React from "react";
import Helpful from '../img/Helpful_logo.png';
import Jogl from '../img/JOGL-12_logo.png';

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerin">
          <div className="w40">
            <h3>Join Our Community</h3>
            <a
              target="_blank"
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
              <a href="#">Privacy Policy</a>
            </div>
            <div className="media-links">
              <img src={Helpful} alt="helpful-logo" />
              <img src={Jogl} alt="jogl-logo" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
