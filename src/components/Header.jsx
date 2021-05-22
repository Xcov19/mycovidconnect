import React from 'react';
import Logo from './Logo';
import Login from './Login';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Logo />
        <Login />
      </div>
    </header>
  );
};

export default Header;
