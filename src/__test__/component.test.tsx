import { render, screen } from '@testing-library/react';
import Header from '../UnrelatedComponents/Header';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Search from '../MainPage/Search';

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
    const searchWord = '';
    render(
      <BrowserRouter>
        <Search actualSearchWord='' callback={(searchWord) => console.log(searchWord)} />
      </BrowserRouter>,
    );
    const comp = screen.getByRole('searchbox');
    expect(comp).toBeInTheDocument();
  });
});
