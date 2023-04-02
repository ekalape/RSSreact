import Card from '../Card';
import React, { FC, useRef, useState } from 'react';

import './style.css';
import UserData from '../../utils/UserData';
import ModalCard from '../ModalCard';
import { createPortal } from 'react-dom';

const CardsContainer: FC<{ users: UserData[] }> = ({ users }) => {
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);

  const handleCardClick = (cardUser: UserData) => {
    setCurrentUser(cardUser);

    setOpenModal(true);
  };
  return (
    <>
      {openModal &&
        currentUser &&
        createPortal(
          <ModalCard user={currentUser} onCloseFn={() => setOpenModal(false)} />,
          document.body
        )}
      <div className="main__cards-container cards__container" role="cards-container">
        {users.length > 0 ? (
          [...users].map((u) => <Card user={u} handleCardClick={handleCardClick} key={u.id} />)
        ) : (
          <p>No items found</p>
        )}
      </div>
    </>
  );
};

export default CardsContainer;
