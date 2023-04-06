import { describe, it } from 'vitest';
import {
  act,
  cleanup,
  findAllByAltText,
  fireEvent,
  getAllByAltText,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
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
const user = userEvent.setup();

describe('Card component', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  beforeAll(() => {
    vi.mock('../utils', async () => ({
      getAllUsers: () => Promise.resolve(fakeUsers),
      filterUsers: (word: string) => Promise.resolve(fakeUsers.filter((x) => x.firstName === word)),
      getUser: (id: number) => Promise.resolve(fakeUsers[0]),
    }));
  });

  it('Card renders correctly', async () => {
    const fakeCard = new UserData(fakeUsers[0]);
    render(
      <BrowserRouter>
        <Card user={fakeCard} handleCardClick={() => console.log('Done')} />
      </BrowserRouter>
    );

    expect(screen.getByText(/terry/i)).toBeInTheDocument();
    expect(screen.queryByText(/lastName/i)).toBeNull();
    expect(screen.getByText(/Washington/i)).toBeInTheDocument();
    expect(screen.getByAltText('user image')).toBeVisible();
  });

  it('Modal Card renders after clicking on a card', async () => {
    const fakeCard = new UserData(fakeUsers[0]);
    await act(async () => {
      render(<CardsContainer users={[fakeCard]} />);
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
      render(<CardsContainer users={[fakeCard]} />);
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
      render(<CardsContainer users={[fakeCard]} />);
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
