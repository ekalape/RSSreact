import Card from '../Card';
import React, { FC, useEffect, useRef, useState } from 'react';
import { UserInterface, SearchWordInterface } from '../../types/interfaces';
import getUsers from '../../utils';
import './style.css';
import UserData from '../../utils/UserData';

const CardsContainer: FC<SearchWordInterface> = (props: SearchWordInterface) => {
  const { searchWord } = props;
  const usersData = useRef<UserData[]>([]);
  const [users, setUsers] = useState<UserData[]>([]);
  console.log('inside fn sw', searchWord);

  useEffect(() => {
    console.log('only First time ', searchWord);

    async function loadUsers() {
      const rawUsers = await getUsers();
      usersData.current = rawUsers.map((u: UserInterface) => new UserData(u));
      setUsers(usersData.current);
    }
    loadUsers();
  }, []);
  useEffect(() => {
    console.log('searchWord', searchWord);

    function updateUsers() {
      const newUsers = usersData.current.filter((u: UserData) => {
        const userSearchFields = Object.entries(u)
          .filter((key) => key[0] !== 'image')
          .map((key) => String(key[1]));
        return userSearchFields.some((key) => key.toLowerCase().includes(searchWord.toLowerCase()));
      });
      setUsers(newUsers);
    }
    updateUsers();
  }, [searchWord]);
  return (
    <div className="main__cards-container cards__container" role="cards-container">
      {users.length > 0 ? users.map((u) => <Card {...u} key={u.id} />) : <p>No items found</p>}
    </div>
  );
};

export default CardsContainer;
