import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Logo />
      </div>
    </header>
  );
};

export default Header;

