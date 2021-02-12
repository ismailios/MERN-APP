import React from "react";
import {Link} from 'react-router-dom'
import Search from './Search'
import Logo from './Logo'
import Navigation from './Navigation'
const Header = () => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Logo />
        <Navigation />
        <Search />
      </div>
    </nav>
  );
};

export default Header;
