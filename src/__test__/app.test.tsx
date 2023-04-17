import { describe, it } from 'vitest';
import { act, cleanup, fireEvent, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';
import { store } from '../store';
import renderWithProviders from './mocks/renderWithProps';
import fetch, { Request, Response } from 'cross-fetch';
import { usersGeneralQuery } from '../utils/QueryServices';
import { setupServer } from 'msw/node';
import { handlers } from './mocks/mockHandlers';

global.fetch = fetch;
global.Request = Request;
global.Response = Response;

export const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});
afterEach(() => {
  server.resetHandlers();
  store.dispatch(usersGeneralQuery.util.resetApiState());
});
afterAll(() => {
  server.close();
});
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  store.dispatch(usersGeneralQuery.util.resetApiState());
});

describe('App', () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithProviders(
        <MemoryRouter>
          <App />
        </MemoryRouter>
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
