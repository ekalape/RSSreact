import Card from '../Card';
import React, { FC } from 'react';

import './style.css';
import UserData from '../../utils/UserData';

const CardsContainer: FC<{ users: UserData[] }> = ({ users }) => {
  return (
    <div className="main__cards-container cards__container" role="cards-container">
      {users.length > 0 ? (
        [...users].map((u) => <Card user={u} key={u.id} />)
      ) : (
        <p className="fail-message">Sorry, no items found</p>
      )}
    </div>
  );
};

export default CardsContainer;
