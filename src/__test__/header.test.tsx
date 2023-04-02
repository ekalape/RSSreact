import { describe, it } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../UnrelatedComponents/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  );
  afterEach(() => cleanup());
  it('Header component renders correctly', () => {
    const headerName = screen.getByRole('header');
    expect(headerName).toBeVisible();
    // screen.getByRole('');
  });

  it('Main page clicked become active', () => {
    const main = screen.getByRole('link', { name: 'Main page' });
    const heading = screen.getByRole('heading', { level: 1 });
    fireEvent.click(main);
    expect(main).toHaveClass('active');
    expect(heading).toHaveTextContent('Main page');
  });

  it('About page clicked become active', () => {
    const about = screen.getByRole('link', { name: 'About page' });
    const heading = screen.getByRole('heading', { level: 1 });
    fireEvent.click(about);
    expect(about).toHaveClass('active');
    expect(heading).toHaveTextContent('About page');
  });
  it('Form page clicked become active', () => {
    const formPage = screen.getByRole('link', { name: 'Form page' });
    const heading = screen.getByRole('heading', { level: 1 });
    fireEvent.click(formPage);
    expect(formPage).toHaveClass('active');
    expect(heading).toHaveTextContent('Form page');
  });
});
