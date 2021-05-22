import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link to="/">
      <img
        className="logo"
        alt="logo"
        src={'https://d2vgampz89jm7o.cloudfront.net/XCOV19+Logo.png'}
      />
    </Link>
  );
};

export default Logo;
