import { describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Header from '../UnrelatedComponents/Header';
import { BrowserRouter } from 'react-router-dom';
import CardsContainer from '../MainPage/CardsContainer';
import '../../public/users.json';
import UserData from '../utils/UserData';
import { UserInterface } from '../types/interfaces';
import Card from '../MainPage/Card';

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

describe('Header Component', () => {
  it('Header component renders correctly', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
    const headerName = screen.getByRole('header');
    expect(headerName).toBeVisible();
  });

  it('Main page clicked become active'),
    () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
      const main = screen.getByText('Main');
      fireEvent.click(main);
      expect(main.classList.contains('active'));
    };

  it('About page clicked become active'),
    () => {
      render(
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      );
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
    const c = screen.getByText('Terry');
    const cImg = screen.getByAltText('user image');
    expect(c).toBeInTheDocument();
    expect(cImg).toBeVisible();
  });
});

describe('Card Container', () => {
  it('Card Container renders correctly', async () => {
    render(<CardsContainer searchWord={''} />);
    const container = await waitFor(() => screen.getByRole('cards-container'));
    expect(container).toBeVisible();
  });
});
