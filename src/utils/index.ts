import { UserInterface } from 'types/interfaces';

export async function getAllUsers() {
  const reqAddress = `https://642a6aa000dfa3b547453ae9.mockapi.io/api/users`;
  const res = await fetch(reqAddress).catch((err) => {
    throw err;
  });
  const users: UserInterface[] = await res.json();
  return users;
}

export async function filterUsers(searchWord: string) {
  if (searchWord.trim()) {
    const reqAddress = new URL('https://642a6aa000dfa3b547453ae9.mockapi.io/api/users');
    reqAddress.searchParams.append('search', searchWord);
    const res = await fetch(reqAddress).catch((err) => {
      throw err;
    });
    const users: UserInterface[] = await res.json();
    console.log('real fn');

    return users;
  } else return await getAllUsers();
}

export async function getUser(id: number) {
  const reqAddress = `https://642a6aa000dfa3b547453ae9.mockapi.io/api/users/${id}`;
  const res = await fetch(reqAddress).catch(() => {
    throw Error('No such user');
  });

  if (res.ok) {
    const user: UserInterface = await res.json();
    return user;
  } else {
    return 'No such user';
  }
}
