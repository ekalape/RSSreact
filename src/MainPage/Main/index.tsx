import Search from '../Search';
import React, { useEffect, useState } from 'react';
import './style.css';
import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import Loader from '../../UnrelatedComponents/Loader';
import { useSelector, useStore } from 'react-redux';

import { RootStateType } from '../../store';

import { useGetAllUsersQuery } from '../../utils/QueryServices';

const Main = () => {
  const store: RootStateType = useStore().getState() as RootStateType;
  console.log('store >', store);

  const word = useSelector((state: RootStateType) => state.customDataReducer.searchWord);
  const { data, error, isLoading } = useGetAllUsersQuery({ limit: 50, page: 1 });

  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    data &&
      setUsers(
        data.map((u: UserInterface) => {
          const us = { ...u, image: `${u.image}?lock=${u.id}` };
          return new UserData(us);
        })
      );
  }, [data]);
  useEffect(() => {
    console.log('word', word);
  }, [word]);
  /*   useEffect(() => {
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
          const arr = users.map((u) => new UserData(u));
          const d = dispatch(loadDataRdc({ users: arr }));
          setUsers(users.map((u: UserInterface) => new UserData(u)));
        })
        .catch(() => {
          setIsFailed(true);
        })
        .finally(() => setIsLoading(false));
    }
  }, [searchWord]); */

  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search />
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <CardsContainer users={users} />
      ) : (
        <p className="fail-message">
          Something went wrong here...
          <br />
          Please, retry
        </p>
      )}
    </div>
  );
};
export default Main;
