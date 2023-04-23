import { describe, it, expect } from 'vitest';
import { act, cleanup, fireEvent, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Main from '../src/MainPage/Main';
import userEvent from '@testing-library/user-event';
import { store } from '../src/store';
import { setupServer } from 'msw/node';
import { usersGeneralQuery } from '../src/utils/QueryServices';
import { handlers } from './mocks/mockHandlers';
import renderWithProviders from './mocks/renderWithProps';
import fetch, { Request, Response } from 'cross-fetch';

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

describe('Main Page render', () => {
  beforeEach(async () => {
    await act(async () => {
      renderWithProviders(<Main />);
    });
  });
  it('Main page renders correctly', async () => {
    await act(async () => {
      const mainPage = screen.getByRole('main-page');
      expect(mainPage).toBeVisible();
    });
  });
  it('Main page contains search bar', async () => {
    await act(async () => {
      const searchBar = screen.getByPlaceholderText('Start search...');
      expect(searchBar).toBeInTheDocument();
    });
  });
  it('Main page contains cards container', async () => {
    const cc = await screen.findByRole('cards-container');
    expect(cc).toBeInTheDocument();
  });
});

describe('Main Page functionality', () => {
  const user = userEvent.setup();
  it('There are no cards if the Search bar has wrong input value', async () => {
    await act(async () => {
      renderWithProviders(<Main />);
    });
    const searchBar = screen.getByRole('searchbox');
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: 'afafafaf' } });
      user.click(screen.getByRole('button', { name: 'searchBtn' }));
    });
    await waitFor(async () => {
      const cc = await screen.findByText(/No items found/i);
      expect(cc).toBeInTheDocument();
    });
  });
  it('Card Container filters correctly', async () => {
    await act(async () => {
      renderWithProviders(<Main />);
    });
    const searchBar = screen.getByRole('searchbox');
    const searchBtn = screen.getByRole('button', { name: 'searchBtn' });
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: 'terry' } });
      user.click(searchBtn);
    });
    await waitFor(async () => {
      const cc = await screen.findAllByRole('single-card');
      expect(cc).toHaveLength(1);
      expect(screen.getByText(/medhurst/i)).toBeInTheDocument();
    });
  });
});

describe('Loader', () => {
  it('Loader renders correctly when api call is delayed', async () => {
    renderWithProviders(<Main />);

    expect(screen.queryByText(/loading/i)).toBeVisible();
    await waitFor(
      async () => {
        expect(screen.queryByText(/loading/i)).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});
