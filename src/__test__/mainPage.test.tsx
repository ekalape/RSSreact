import { describe, it } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import CardsContainer from '../MainPage/CardsContainer';
import UserData from '../utils/UserData';
import { UserInterface } from '../types/interfaces';
import Main from '../MainPage/Main';
import userEvent from '@testing-library/user-event';

const fakeUsers: UserInterface[] = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    gender: 'male',
    firstColor: 'Green',
    image: 'https://robohash.org/hicveldicta.png',
    secondColor: 'Red',
    birthDate: '2000-12-25',
    animal: 'Dog',
    country: 'Washington',
  },
  {
    id: 2,
    firstName: 'Sheldon',
    lastName: 'Quigley',
    gender: 'male',
    firstColor: 'Brown',
    image: 'https://robohash.org/doloremquesintcorrupti.png',
    secondColor: 'Blue',
    birthDate: '2003-08-02',
    animal: 'Lion',
    country: 'Louisville',
  },
];
const fakeUsersData = fakeUsers.map((x) => new UserData(x));
afterEach(async () => {
  cleanup();
  vi.restoreAllMocks();
});
beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});

vi.mock('../utils/index.ts', () => ({
  filterUsers: async (word: string) =>
    Promise.resolve(
      fakeUsers.filter((u) =>
        Object.values(u).some((val) => {
          return val.toString().toLowerCase() == word.toLowerCase();
        })
      )
    ),
  getAllUsers: async () => Promise.resolve(fakeUsers),
}));

describe('Main Page render', () => {
  beforeEach(
    async () =>
      await act(async () => {
        render(
          <BrowserRouter>
            <Main />
          </BrowserRouter>
        );
      })
  );
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
  beforeEach(() => {
    cleanup();
    vi.restoreAllMocks();
    vi.clearAllMocks();
    vi.resetAllMocks();
  });
  it('There are no cards if the Search bar has wrong input value', async () => {
    await act(async () =>
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      )
    );

    const searchBar = screen.getByRole('searchbox');
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: 'afafafaf' } });
      user.click(screen.getByRole('button', { name: 'searchBtn' }));
    });
    await waitFor(
      async () => {
        const cc = await screen.findByText(/No items found/i);
        expect(cc).toBeInTheDocument();
      },
      { timeout: 500 }
    );
  });
  it('Card Container filters correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
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
    vi.mock('../utils', async () => ({
      getAllUsers: () => {
        setTimeout(() => Promise.resolve(fakeUsers), 800);
      },
    }));
    render(
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    );

    expect(screen.queryByText(/loading/i)).toBeVisible();
    await waitFor(
      async () => {
        expect(screen.queryByText(/loading/i)).toBeNull();
      },
      { timeout: 1000 }
    );
  });
});

describe('Card Container', () => {
  it('Card Container renders correctly', async () => {
    render(<CardsContainer users={fakeUsersData} />);
    const container = await screen.findByRole('cards-container');
    expect(container).toBeVisible();
  });
  it('Error message if bad request', async () => {
    const funcs = await import('../utils');
    funcs.filterUsers = vi.fn().mockReturnValueOnce(Promise.resolve(Error()));

    await act(async () => {
      render(
        <MemoryRouter>
          <Main />
        </MemoryRouter>
      );
    });
    await act(async () => {
      const failMessage = await screen.findByText(/something/i);
      expect(failMessage).toBeInTheDocument();
    });
  });
});
