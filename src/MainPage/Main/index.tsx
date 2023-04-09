import Search from '../Search';
import React, { useEffect, useState } from 'react';
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
  const [isFailed, setIsFailed] = useState(false);

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };

  useEffect(() => {
    setIsLoading(true);
    if (searchWord.trim()) {
      filterUsers(searchWord)
        .then((usersArray) => {
          setUsers(usersArray.map((u) => new UserData(u)));
        })
        .catch(() => {
          setIsFailed(true);
        })
        .finally(() => setIsLoading(false));
    } else {
      getAllUsers()
        .then((users) => {
          setUsers(users.map((u: UserInterface) => new UserData(u)));
        })
        .catch(() => {
          setIsFailed(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchWord]);

  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchWord} />

      {isLoading ? (
        <Loader />
      ) : !isFailed ? (
        <CardsContainer users={users} />
      ) : (
        <p className="fail-message">Something went wrong here...</p>
      )}
    </div>
  );
};
export default Main;
