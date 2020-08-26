import React from "react";

const Copyrights = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div id="copyrights">
      <div className="copyrights-in">
        <div className="copyrights-text">
          <p>Copyrights &copy; {currentYear} Xcov19. All Rights Reserved</p>
        </div>
        <div className="social-icons">
          <ul>
            <li>
              <a
                href="https://www.instagram.com"
                title="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                title="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </li>
            <li>
              <a
                href="https://www.facebook.com"
                title="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
