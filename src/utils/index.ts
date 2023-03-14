import { UserInterface } from 'types/interfaces';
import usersJson from '../../public/users.json';

async function getUsers() {
  const users: UserInterface[] = usersJson as UserInterface[];

  return users;
}
export default getUsers;
