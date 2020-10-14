import React,{useState} from "react";
import { Link } from "react-router-dom";
import Copyrights from "./Copyrights";


const Footer = (props) => {
  const [show,setShow] = useState(false);
  const showModal = () => {
    setShow(true);
    props.sendData(!show);
  }

  
  // const hideModal = () =>{
  //   setShow(false);
  // };

  return (
    <>
      <footer>
        <div className="footerin">
          <div className="w40">
            <h3>Join Our Community</h3>
            <a href="https://www.google.com" title="Join Now">
              Join Now
            </a>
          </div>
          <div className="w30">
            <ul>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="w30">
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
                <Link to="/" title="Privacy Policy" onClick = {showModal}>
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
            </ul>
          </div>
        </div>
      </footer>
      <Copyrights />
    </>
  );
};

export default Footer;
