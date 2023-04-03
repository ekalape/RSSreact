import { UserInterface } from 'types/interfaces';

export const API_ADDRESS =
  'https://dummyjson.com/users?select=firstName,lastName,age,gender,eyeColor,hair,address,birthDate,image' as const;

export async function getAllUsers() {
  const reqAddress = `https://642a6aa000dfa3b547453ae9.mockapi.io/api/users`;
  const res = await fetch(reqAddress);
  const users: UserInterface[] = await res.json();
  console.log(users);
  return users;
}

export async function filterUsers(searchWord: string) {
  if (searchWord.trim()) {
    const reqAddress = new URL('https://642a6aa000dfa3b547453ae9.mockapi.io/api/users');
    reqAddress.searchParams.append('search', searchWord);
    const res = await fetch(reqAddress);
    const users: UserInterface[] = await res.json();
    console.log(users);
    return users;
  } else return await getAllUsers();
}
