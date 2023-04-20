import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './style.css';

const Header = () => {
  const [pageName, setPageName] = useState('Main page');
  const loc = useLocation();

  useEffect(() => {
    switch (loc.pathname) {
      case '/':
        setPageName('Main page');
        break;
      case '/form':
        setPageName('Form page');
        break;
      case '/about':
        setPageName('About page');
        break;
      default:
        '404 page';
    }
  }, [loc]);

  return (
    <div className="header__wrapper" role="header">
      <h1>{pageName}</h1>
      <nav className="navigation__wrapper">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
          Main page
        </NavLink>
        <NavLink to="/form" className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
          Form page
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
          About page
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
