import { describe, it, expect } from 'vitest';
import { act, cleanup, screen } from '@testing-library/react';
import React from 'react';
import UserData from '../src/utils/UserData';
import Card from '../src/MainPage/Card';
import userEvent from '@testing-library/user-event';
import fakeUsers from './mocks/fakeUsers';
import { handlers } from './mocks/mockHandlers';
import renderWithProviders from './mocks/renderWithProps';
import fetch, { Request, Response } from 'cross-fetch';
import { setupServer } from 'msw/node';
import { store } from '../src/store';
import { usersGeneralQuery } from '../src/utils/QueryServices';
import { rest } from 'msw';

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
  server.use(
    rest.get(`https://642a6aa000dfa3b547453ae9.mockapi.io/api/users/*`, (req, res, ctx) => {
      return res(ctx.json(fakeUsers[0]));
    })
  );
});
afterEach(() => {
  cleanup();
  store.dispatch(usersGeneralQuery.util.resetApiState());
});
afterAll(() => {
  server.close();
});

const user = userEvent.setup();

describe('Card component', () => {
  it('Card renders correctly', async () => {
    const fakeCard = new UserData(fakeUsers[0]);
    await act(async () => {
      renderWithProviders(<Card user={fakeCard} />);
    });

    expect(screen.getByText(/terry/i)).toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).toBeNull();
    expect(screen.getByText(/Washington/i)).toBeInTheDocument();
    expect(screen.getByAltText('user image')).toBeVisible();
  });

  it('Modal Card renders after clicking on a card', async () => {
    const fakeCard = new UserData(fakeUsers[0]);

    await act(async () => {
      renderWithProviders(<Card user={fakeCard} />);
    });

    const card = await screen.findByRole('single-card');
    await act(async () => {
      await user.click(card);
    });

    expect(await screen.findByRole('modal-window')).toBeVisible();
  });
  it('Modal data is the same as in the card', async () => {
    const fakeCard = new UserData(fakeUsers[0]);

    await act(async () => {
      renderWithProviders(<Card user={fakeCard} />);
    });
    const card = await screen.findByRole('single-card');

    await act(async () => {
      await user.click(card);
    });
    const firstName = await screen.findAllByText(/terry/i);
    const secondName = await screen.findAllByText(/medhurst/i);
    const image = await screen.findAllByAltText(/image/i);

    expect(firstName).toHaveLength(2);
    expect(secondName).toHaveLength(2);
    expect(image).toHaveLength(2);

    expect(await screen.findByText(/dog/i)).toBeInTheDocument();
    expect(await screen.findByText(/red/i)).toBeInTheDocument();
  });
  it('Modal window is closed after click on close btn', async () => {
    const fakeCard = new UserData(fakeUsers[0]);

    await act(async () => {
      renderWithProviders(<Card user={fakeCard} />);
    });

    const card = await screen.findByRole('single-card');

    await act(async () => {
      await user.click(card);
    });
    const firstName = await screen.findByRole('button', { name: 'x' });
    await act(async () => {
      await user.click(firstName);
    });

    expect(screen.queryByText(/dog/i)).toBeNull();
    expect(screen.queryByText(/red/i)).toBeNull();
    expect(await screen.findAllByText(/terry/i)).toHaveLength(1);
  });
});
