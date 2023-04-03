import Search from '../Search';
import React, { Suspense, useEffect, useRef, useState } from 'react';
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
      // setIsLoading(true);
    }
  };
  useEffect(() => {
    async function loadUsers() {
      const rawUsers = await getAllUsers();
      usersData.current = rawUsers.map((u: UserInterface) => new UserData(u));
      setUsers(usersData.current);
    }

    loadUsers();
  }, []);

  useEffect(() => {
    filterUsers(searchWord).then((usersArray) => setUsers(usersArray.map((u) => new UserData(u))));
  }, [searchWord]);
  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />
      <Suspense fallback={<Loader />}>
        <CardsContainer users={users} /> {/*  {isLoading ? <Loader /> : } */}
      </Suspense>
    </div>
  );
};
export default Main;
