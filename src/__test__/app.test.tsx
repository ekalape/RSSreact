import { describe, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import '../../public/users.json';

import App from '../App';

describe('App', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });
  });
  afterEach(cleanup);
  it('App renders correctly', () => {
    act(() => {
      expect(screen.getByRole('header')).toBeVisible();
      expect(screen.getByRole('searchbox')).toBeVisible();
      expect(screen.getByRole('main-page')).toBeVisible();
    });
  });
  it('About page renders correctly after the click on About in the nav panel ', async () => {
    act(() => {
      const aboutLink = screen.getByText(/about/i);
      fireEvent.click(aboutLink);
    });

    await act(async () => {
      const result = await screen.findByText(/this is about page/i);
      expect(result).toBeVisible();
    });
  });
  it('Form page renders correctly after the click on Form in the nav panel ', async () => {
    act(() => {
      const formLink = screen.getByText(/form/i);
      fireEvent.click(formLink);
    });

    await act(async () => {
      const result = await screen.findByText(/compile the form/i);
      expect(result).toBeVisible();
    });
  });
});
