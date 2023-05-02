import Search from '../Search';
import React, { useEffect, useState } from 'react';
import './style.css';
import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import Loader from '../../UnrelatedComponents/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useGetAllUsersQuery } from '../../utils/QueryServices';
import { addSearchWordRdc } from '../../store/dataSlice';

const Main = () => {
  const [word, setWord] = useState(
    useSelector((state: RootState) => state.customDataReducer.searchWord)
  );
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetAllUsersQuery({
    word,
  });
  function handleSearchFn(word: string) {
    setWord(word);
  }
  useEffect(() => {
    dispatch(addSearchWordRdc({ word }));
  }, [word, dispatch]);

  return (
    <div className="main__wrapper" role={'main-page'}>
      <Search callback={handleSearchFn} />
      {isLoading ? (
        <Loader />
      ) : !error ? (
        <CardsContainer
          users={
            data
              ? data.map((u: UserInterface) => {
                  const us = { ...u, image: `${u.image}?lock=${u.id}` };
                  return new UserData(us);
                })
              : []
          }
        />
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
