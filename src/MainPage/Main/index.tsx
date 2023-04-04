import Search from '../Search';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import './style.css';

import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import { getAllUsers, filterUsers } from '../../utils';
import Loader from '../../UnrelatedComponents/Loader';

const Main = () => {
  const [searchWord, setSearchWord] = useState(localStorage.getItem('eklp-storagedInput') || '');
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
    console.log('word inside handle fn >> ', word);
  };

  useEffect(() => {
    console.log('searchWord inside useEffect', searchWord);
    setIsLoading(true);
    if (searchWord.trim()) {
      filterUsers(searchWord)
        .then((usersArray) => setUsers(usersArray.map((u) => new UserData(u))))
        .finally(() => setIsLoading(false));
    } else {
      getAllUsers()
        .then((users) => setUsers(users.map((u: UserInterface) => new UserData(u))))
        .finally(() => setIsLoading(false));
    }
  }, [searchWord]);
  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />

      {isLoading ? <Loader /> : <CardsContainer users={users} />}
    </div>
  );
};
export default Main;
