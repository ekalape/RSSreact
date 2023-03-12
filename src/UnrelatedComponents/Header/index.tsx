import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export default class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <nav className='header__wrapper'>
        <NavLink to='/' className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
          Main page
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => (isActive ? 'active' : 'notActive')}>
          About page
        </NavLink>
      </nav>
    );
  }
}
