import { UserInterface } from 'types/interfaces';
import usersJson from '../assets/users.json';
import { transformSearchWords } from './helpers';

export const API_ADDRESS =
  'https://dummyjson.com/users?select=firstName,lastName,age,gender,eyeColor,hair,address,birthDate,image' as const;

async function getUsers() {
  const reqAddress = API_ADDRESS;
  const users: UserInterface[] = usersJson as UserInterface[];
  return users;
}

export async function getAllUsers() {
  const reqAddress = API_ADDRESS + '&limit=50';
  const res = await fetch(reqAddress);
  const users: { users: UserInterface[] } = await res.json();
  console.log(users);
  return users;
}

export async function filterUsers(searchWord: string) {
  const reqAddress = API_ADDRESS + '&limit=50';

  console.log(reqAddress);

  const res = await fetch(reqAddress);
  const users: { users: UserInterface[] } = await res.json();
  console.log(users);
  return users.users;
}
