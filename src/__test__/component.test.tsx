import { describe, it } from 'vitest';
import { act, cleanup, findAllByAltText, fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Header from '../UnrelatedComponents/Header';
import { BrowserRouter } from 'react-router-dom';
import CardsContainer from '../MainPage/CardsContainer';
import '../../public/users.json';
import UserData from '../utils/UserData';
import { UserInterface } from '../types/interfaces';
import Card from '../MainPage/Card';
import Main from '../MainPage/Main';
import App from '../App';

const fakeUsers: UserInterface[] = [
  {
    id: 1,
    firstName: 'Terry',
    lastName: 'Medhurst',
    age: 50,
    gender: 'male',
    height: 189,
    eyeColor: 'Green',
    image: 'https://robohash.org/hicveldicta.png',
    hair: { color: 'Black', type: 'Strands' },
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
    height: 187,
    eyeColor: 'Brown',
    image: 'https://robohash.org/doloremquesintcorrupti.png',
    hair: { color: 'Blond', type: 'Curly' },
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
});

describe('Header Component', () => {
  beforeEach(() =>
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    )
  );
  it('Header component renders correctly', () => {
    const headerName = screen.getByRole('header');
    expect(headerName).toBeVisible();
  });

  it('Main page clicked become active'),
    () => {
      const main = screen.getByText('Main');
      fireEvent.click(main);
      expect(main.classList.contains('active'));
    };

  it('About page clicked become active'),
    () => {
      const main = screen.getByText('About');
      fireEvent.click(main);
      expect(main.classList.contains('active'));
    };
});

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
    const mainPage = screen.getByRole('main-page');
    expect(mainPage).toBeVisible();
  });
  it('Main page contains search bar', () => {
    const searchBar = screen.getByPlaceholderText('Start search...');
    expect(searchBar).toBeInTheDocument();
  });
  it('Main page contains cards container', async () => {
    const cc = await screen.findByRole('cards-container');
    expect(cc).toBeInTheDocument();
  });
});

describe('Main Page', () => {
  it('There are no cards if the Search bar has wrong input value', async () => {
    vi.mock('../utils', async () => ({
      default: () => Promise.resolve(fakeUsers),
    }));
    render(<Main />);
    const searchBar = screen.getByRole('searchbox');
    act(() => {
      fireEvent.change(searchBar, { target: { value: 'afafafaf' } });
      fireEvent.click(screen.getByRole('button', { name: 'searchBtn' }));
    });

    const cc = await screen.findByRole('cards-container');
    expect(cc).toContainHTML('<p>No items found</p>');
  });
});

describe('Card Container', () => {
  it('Card Container renders correctly', async () => {
    render(<CardsContainer searchWord={''} />);
    const container = await screen.findByRole('cards-container');
    expect(container).toBeVisible();
  });

  it('Card Container filters correctly', async () => {
    vi.mock('../utils', async () => ({
      default: () => Promise.resolve(fakeUsers),
    }));
    const cont = render(<CardsContainer searchWord={'Terry'} />).container;
    const cardItems = await findAllByAltText(cont, /image/i);
    expect(cardItems.length).toBe(1);
  });
});
