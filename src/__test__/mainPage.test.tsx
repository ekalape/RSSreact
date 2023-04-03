import { describe, it } from 'vitest';
import { act, findAllByAltText, fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import CardsContainer from '../MainPage/CardsContainer';
import '../../public/users.json';
import UserData from '../utils/UserData';
import { UserInterface } from '../types/interfaces';
import Card from '../MainPage/Card';
import Main from '../MainPage/Main';
import userEvent from '@testing-library/user-event';

const fakeUsers: UserInterface[] = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    age: 50,
    gender: 'male',
    firstColor: 'Green',
    image: 'https://robohash.org/hicveldicta.png',
    second: { color: 'Black', type: 'Strands' },
    birthDate: '2000-12-25',
    address: {
      address: '1745 T Street Southeast',
      city: 'Washington',
      coordinates: { lat: 38.867033, lng: -76.979235 },
      postalCode: '20020',
      state: 'DC',
    },
  },
  {
    id: 2,
    firstName: 'Sheldon',
    lastName: 'Quigley',
    age: 28,
    gender: 'male',
    firstColor: 'Brown',
    image: 'https://robohash.org/doloremquesintcorrupti.png',
    second: { color: 'Blond', type: 'Curly' },
    birthDate: '2003-08-02',
    address: {
      address: '6007 Applegate Lane',
      city: 'Louisville',
      coordinates: { lat: 38.1343013, lng: -85.6498512 },
      postalCode: '40219',
      state: 'KY',
    },
  },
];
const fakeUsersData = fakeUsers.map((x) => new UserData(x));

describe('Card component', () => {
  it('Card renders correctly', async () => {
    const fakeCard = new UserData(fakeUsers[0]);
    render(
      <BrowserRouter>
        <Card {...fakeCard} />
      </BrowserRouter>
    );

    expect(screen.getByText(/terry/i)).toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).toBeNull();
    expect(screen.getByText(/Washington/i)).toBeInTheDocument();
    expect(screen.getByAltText('user image')).toBeVisible();
  });
});

describe('Main Page', () => {
  beforeEach(() =>
    act(() => {
      render(
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      );
    })
  );
  it('Main page renders correctly', () => {
    act(() => {
      const mainPage = screen.getByRole('main-page');
      expect(mainPage).toBeVisible();
    });
  });
  it('Main page contains search bar', () => {
    act(() => {
      const searchBar = screen.getByPlaceholderText('Start search...');
      expect(searchBar).toBeInTheDocument();
    });
  });
  it('Main page contains cards container', async () => {
    const cc = await screen.findByRole('cards-container');
    expect(cc).toBeInTheDocument();
  });
});

describe('Main Page', () => {
  const user = userEvent.setup();
  it('There are no cards if the Search bar has wrong input value', async () => {
    vi.mock('../utils', async () => ({
      default: () => Promise.resolve(fakeUsers),
    }));
    render(<Main />);
    const searchBar = screen.getByRole('searchbox');
    act(() => {
      fireEvent.change(searchBar, { target: { value: 'afafafaf' } });
      user.click(screen.getByRole('button', { name: 'searchBtn' }));
    });
    await waitFor(
      async () => {
        const cc = await screen.findByRole('cards-container');
        expect(cc).toContainHTML('<p>No items found</p>');
      },
      { timeout: 500 }
    );
  });
  it('Card Container filters correctly', async () => {
    vi.mock('../utils', async () => ({
      default: () => Promise.resolve(fakeUsers),
    }));
    render(<Main />);
    const searchBar = screen.getByRole('searchbox');
    act(() => {
      fireEvent.change(searchBar, { target: { value: 'Terry' } });
      user.click(screen.getByRole('button', { name: 'searchBtn' }));
    });
    await waitFor(
      async () => {
        const cc = await screen.findByRole('cards-container');
        const cardItems = await findAllByAltText(cc, /image/i);
        expect(cardItems.length).toBe(1);
      },
      { timeout: 500 }
    );
  });
});

describe('Card Container', () => {
  it('Card Container renders correctly', async () => {
    render(<CardsContainer users={fakeUsersData} />);
    const container = await screen.findByRole('cards-container');
    expect(container).toBeVisible();
  });
});
