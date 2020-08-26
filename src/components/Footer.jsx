import React from "react";
import { Link } from "react-router-dom";
import Copyrights from "./Copyrights";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="footerin">
          <div className="w40">
            <h3>Join Our Community via Email</h3>
            <p>some demo text which can be replaced</p>
            <form>
              <input type="" placeholder="Email Address" />
              <button>Join</button>
            </form>
          </div>
          <div className="w20">
            <ul>
              <li>
                <a href="tel:+919131167787">+91 9131167787</a>
              </li>
              <li>
                <a href="mailto:info@xcov.com">info@xcov.com</a>
              </li>
            </ul>
          </div>
          <div className="w20">
            <ul>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="w20">
            <ul>
              <li>
                <Link to="/about" title="About XCOV19">
                  About XCOV19
                </Link>
              </li>
              <li>
                <Link to="/career" title="Work with Us">
                  Work with Us
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" title="Privacy Policy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" title="Terms &amp; Conditions">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/press-enquiries" title="Press Enquiries">
                  Press Enquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <Copyrights />
    </>
  );
};

export default Footer;
