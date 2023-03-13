import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

export default class Header extends React.Component<{}, { pageName: string }> {
  constructor(props: { pageName: string }) {
    super(props);
    this.state = { pageName: '' };
  }

  componentDidMount(): void {
    this.setState({ pageName: 'Main page' });
  }

  render(): React.ReactNode {
    return (
      <div className='header__wrapper'>
        <h1>{this.state.pageName}</h1>
        <nav className='navigation__wrapper'>
          <NavLink
            to='/'
            className={({ isActive }) => (isActive ? 'active' : 'notActive')}
            onClick={() => this.setState({ pageName: 'Main page' })}>
            Main page
          </NavLink>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? 'active' : 'notActive')}
            onClick={() => this.setState({ pageName: 'About page' })}>
            About page
          </NavLink>
        </nav>
      </div>
    );
  }
}
