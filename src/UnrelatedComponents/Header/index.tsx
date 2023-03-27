import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './style.css';

const Header = () => {
  const [pageName, setPageName] = useState('Main page');
  const loc = useLocation();

  useEffect(() => {
    if (loc.pathname !== '/' && loc.pathname !== '/about' && loc.pathname !== '/form')
      setPageName('404 page');
  }, [loc]);

  return (
    <div className="header__wrapper" role="header">
      <h1>{pageName}</h1>
      <nav className="navigation__wrapper">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
          onClick={() => setPageName('Main page')}
        >
          Main page
        </NavLink>
        <NavLink
          to="/form"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
          onClick={() => setPageName('Form page')}
        >
          Form page
        </NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? 'active' : 'notActive')}
          onClick={() => setPageName('About page')}
        >
          About page
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
