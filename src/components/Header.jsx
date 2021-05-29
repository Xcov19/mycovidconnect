import React from 'react';
import Logo from './Logo';
import Login from './Login';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Logo />
        <div className="d-md-block d-none">
        <Login />
        </div>
      </div>
    </header>
  );
};

export default Header;
