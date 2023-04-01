import Search from '../Search';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import { getAllUsers, filterUsers } from '../../utils';
import Loader from '../../UnrelatedComponents/Loader';

const Main = () => {
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const usersData = useRef<UserData[]>([]);

  const handleSearchWord = (word: string) => {
    if (word) {
      setSearchWord(word);
      setIsLoading(true);
    }
  };
  useEffect(() => {
    async function loadUsers() {
      const rawUsers = await getAllUsers();
      usersData.current = rawUsers.users.map((u: UserInterface) => new UserData(u));
      setUsers(usersData.current);
    }

    loadUsers();
  }, []);
  useEffect(() => {
    const words = searchWord.split(' ');
    const newUsers = usersData.current.filter((u: UserData) => {
      const userSearchFields = Object.entries(u)
        .filter((key) => key[0] !== 'image')
        /*  .map((key) => String(key[1])); */
        .flat()
        .map(String);

      return words.every((s) =>
        userSearchFields.some((key) => key.toLowerCase().includes(s.toLowerCase()))
      );
    });

    setUsers(newUsers);
    setIsLoading(false);
  }, [searchWord]);
  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />
      {isLoading ? <Loader /> : <CardsContainer users={users} />}
    </div>
  );
};
export default Main;
