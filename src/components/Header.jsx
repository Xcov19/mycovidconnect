import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <div className="headerin">
        <Link to="/">
          <Logo />
        </Link>
      </div>
    </header>
  );
};

export default Header;

