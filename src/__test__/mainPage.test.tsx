import { describe, it } from 'vitest';
import {
  act,
  cleanup,
  fireEvent,
  getAllByAltText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
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
afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

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
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  it('There are no cards if the Search bar has wrong input value', async () => {
    vi.mock('../utils', async () => ({
      getAllUsers: () => Promise.resolve(fakeUsers),
      filterUsers: (word: string) => Promise.resolve(fakeUsers.filter((x) => x.firstName === word)),
    }));
    await act(async () => render(<Main />));

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
    vi.mock('../utils', async () => ({
      getAllUsers: () => Promise.resolve(fakeUsers),
      filterUsers: (word: string) =>
        Promise.resolve(
          fakeUsers.filter((x) => {
            console.log('x >> ', x);

            return x.firstName === word;
          })
        ),
    }));
    await act(async () => render(<Main />));
    const searchBar = screen.getByRole('searchbox');
    await act(async () => {
      fireEvent.change(searchBar, { target: { value: 'Terry' } });
      user.click(screen.getByRole('button', { name: 'searchBtn' }));
    });
    await waitFor(() => {
      const cc = screen.getByRole('cards-container');

      const cardItems = getAllByAltText(cc, /image/i);
      expect(cardItems.length).toBe(1);
    });
  });
});

describe('Card Container', () => {
  it('Card Container renders correctly', async () => {
    render(<CardsContainer users={fakeUsersData} />);
    const container = await screen.findByRole('cards-container');
    expect(container).toBeVisible();
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
