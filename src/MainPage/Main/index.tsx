import Search from '../Search';
import React, { useEffect, useRef, useState } from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import getUsers from '../../utils';

const Main = () => {
  const [searchWord, setSearchWord] = useState('');
  const [users, setUsers] = useState<UserData[]>([]);
  const usersData = useRef<UserData[]>([]);

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };
  useEffect(() => {
    async function loadUsers() {
      const rawUsers = await getUsers();
      usersData.current = rawUsers.map((u: UserInterface) => new UserData(u));
      setUsers(usersData.current);
    }
    loadUsers();
  }, []);
  useEffect(() => {
    const words = searchWord.split(' ');
    const newUsers = usersData.current.filter((u: UserData) => {
      const userSearchFields = Object.entries(u)
        .filter((key) => key[0] !== 'image')
        .map((key) => String(key[1]));
      return words.every((s) =>
        userSearchFields.some((key) => key.toLowerCase().includes(s.toLowerCase()))
      );
    });
    setUsers(newUsers);
  }, [searchWord]);
  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />
      <CardsContainer users={users} />
    </div>
  );
};
export default Main;
