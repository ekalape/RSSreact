import Search from '../Search';
import React, { useEffect, useState } from 'react';
import './style.css';
import CardsContainer from '../CardsContainer';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import Loader from '../../UnrelatedComponents/Loader';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { loadDataRdc } from '../../store/dataSlice';
import { RootStateType } from '../../store';
import useFetchUsers from '../../utils/useFetchUsers';

const Main = () => {
  const store: RootStateType = useStore().getState() as RootStateType;
  console.log('store >', store);
  const dispatch = useDispatch();
  const { data, isLoading, isFailed } = useFetchUsers();

  const [searchWord, setSearchWord] = useState(store.searchWord);
  const rawUsers = useSelector((state: RootStateType) => state.users);
  const [users, setUsers] = useState<UserData[]>(data.map((u: UserInterface) => new UserData(u)));

  const handleSearchWord = (word: string) => {
    setSearchWord(word);
  };
  useEffect(() => {
    if (!isFailed) {
      dispatch(
        loadDataRdc({
          users: data,
        })
      );
    }
  }, [data]);
  useEffect(() => {
    setUsers(rawUsers.map((u: UserInterface) => new UserData(u)));
  }, [rawUsers]);
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
