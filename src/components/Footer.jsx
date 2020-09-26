import React from "react";
// import { Link } from "react-router-dom";
// import Copyrights from "./Copyrights";
import FaceBookIcon from "../img/facebook.svg";
import TwitterIcon from "../img/twitter.svg";
import LinkedinIcon from '../img/linkedin.svg';
import MailIcon from '../img/mail.svg';

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
            <div className="social-media">
              <a href="#">
                <img src={FaceBookIcon} className="filter-blue" />
              </a>
              <a href="#">
                <img src={TwitterIcon} className="filter-blue" />
              </a>
              <a href="#">
                <img src={LinkedinIcon} className="filter-blue" />
              </a>
              <a href="#">
                <img src={MailIcon} className="filter-blue" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
