import React from 'react';
import { useHistory } from 'react-router-dom';

const Logo = () => {

  const history = useHistory();

  return (
      <img
      onClick={()=>{ return history.push('/')}}
        className="logo"
        alt="logo"
        src={'https://d2vgampz89jm7o.cloudfront.net/XCOV19+Logo.png'}
      />
  );
};

export default Logo;
