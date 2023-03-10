import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
  render(): React.ReactNode {
    return (
      <div className='header__wrapper'>
        <Link to='/'>Main page</Link>
        <Link to='/about'>About page</Link>
      </div>
    );
  }
}
