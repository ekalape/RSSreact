import React, { FC, useState } from 'react';

import UserData from '../../utils/UserData';
//import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';
import { CardType } from '../../types/interfaces';

const FormCard: FC<CardType> = (props: CardType) => {
  const { firstName, lastName, country, image } = props.user;
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCardClick = () => {
    setIsLoading(true);
    setCurrentUser(props.user);
    setOpenModal(true);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading && createPortal(<Loader />, document.body)}
      {openModal &&
        currentUser &&
        createPortal(
          <ModalCard
            user={currentUser}
            onCloseFn={() => {
              setOpenModal(false);
            }}
          />,
          document.body
        )}
      <div className="card__wrapper" onClick={onCardClick} role="single-card">
        <img src={image} alt="user image" />
        <div className="card__names">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <div className="card-data__wrapper">
          <p>
            <span className="card-data__property">Country:</span> {country}
          </p>
        </div>
      </div>
    </>
  );
};

export default FormCard;
