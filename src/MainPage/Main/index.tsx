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
  const word = useSelector((state: RootStateType) => state.customDataReducer.searchWord);
  const { data, error, isLoading } = useGetAllUsersQuery({ word: word, limit: 50, page: 1 });

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
