import { describe, it, Mock } from 'vitest';
import { cleanup } from '@testing-library/react';

import { UserInterface } from '../types/interfaces';
import { filterUsers, getAllUsers, getUser } from '../utils';

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
    country: 'Japan',
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
    country: 'Austria',
  },
];

describe('Fetch test', () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });
  it('getAllUsers returns correct data', async () => {
    global.fetch = vi.fn(() => ({
      json: () => Promise.resolve(fakeUsers),
    })) as Mock;
    const users = await getAllUsers();
    expect(fetch).toBeCalledTimes(1);
    expect(users).toHaveLength(2);
  });
  it('getUser returns correct data', async () => {
    const id = 0;
    global.fetch = vi.fn(() =>
      Promise.resolve({ ok: true, json: () => Promise.resolve(fakeUsers[id]) })
    ) as Mock;

    const user = await getUser(id);
    expect(fetch).toBeCalledTimes(1);
    expect(typeof user !== 'string' && user.country).toBe('Japan');
    expect(user).toStrictEqual(fakeUsers[0]);
  });
  it('getUser with wrong id returns correct responce', async () => {
    const id = 4;
    global.fetch = vi.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(fakeUsers[id]) })
    ) as Mock;
    const user = await getUser(id);
    expect(fetch).toBeCalledTimes(1);
    expect(user).toBe('No such user');
  });
  it('filterUser works correctly', async () => {
    const searchWord = 'Japan';
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve(
            fakeUsers.filter((u) =>
              Object.values(u).some((val) => {
                return val === searchWord;
              })
            )
          ),
      })
    ) as Mock;
    const users = await filterUsers(searchWord);
    expect(fetch).toBeCalledTimes(1);
    expect(users).toHaveLength(1);
  });
});
