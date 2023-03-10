import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from 'components/Main';
import Search from '../components/Search';

describe('Header', () => {
  test('Should render the Header page', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );
    const comp = screen.getAllByRole('link');
    comp.forEach((c) => {
      expect(c).toBeInTheDocument();
    });
  });
});

describe('Search', () => {
  test('Should render the Search block', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>,
    );
    const comp = screen.getByRole('searchbox');
    expect(comp).toBeInTheDocument();
  });
});
