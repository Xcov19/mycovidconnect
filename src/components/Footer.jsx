import React from "react";
// import { Link } from "react-router-dom";
// import Copyrights from "./Copyrights";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerin">
          <div className="w40">
            <h3>Join Our Community</h3>
            <a href="https://forum.mycovidconnect.com/" title="Join Now">
              Join Now
            </a>
          </div>
          <div className="w30">
            <a href="https://forum.mycovidconnect.com/d/2-about-xcov19-rapid-action-patient-dispatch-solution">
              About XCOV19
            </a>
            <a href="#">Contact Us</a>
            {/* <li>
                <Link to="/">FAQ</Link>
              </li> */}
          </div>
          {/* <div className="w30">
            <ul>
              <li>
                <Link to="/" title="About XCOV19">
                  About XCOV19
                </Link>
              </li>
              <li>
                <Link to="/" title="Work with Us">
                  Work with Us
                </Link>
              </li>
              <li>
                <Link to="/" title="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" title="Terms &amp; Conditions">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/" title="Press Enquiries">
                  Press Enquiries
                </Link>
              </li>
            </ul> */}
          {/* </div> */}
        </div>
      </footer>
      {/* <Copyrights /> */}
    </>
  );
};

export default Footer;
