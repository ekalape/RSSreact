import { describe, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../UnrelatedComponents/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header Component', () => {
  it('Header component renders correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const headerName = screen.getByRole('header');
    expect(headerName).toBeVisible();
  });

  it('Main page clicked became active'),
    () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const main = screen.getByText('Main');
      fireEvent.click(main);
      expect(main.classList.contains('active'));
    };

  it('About page clicked became active'),
    () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const main = screen.getByText('About');
      fireEvent.click(main);
      expect(main.classList.contains('active'));
    };
});
