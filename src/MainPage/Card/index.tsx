import React, { FC, useEffect, useState } from 'react';
import { getUser } from '../../utils';
import UserData from '../../utils/UserData';
import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';
import { useGetSingleUserQuery } from '../../utils/QueryServices';
import { UserInterface } from 'types/interfaces';
import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export type CardType = {
  user: UserData;
};

const Card: FC<CardType> = (props: CardType) => {
  const { id, firstName, lastName, country, image } = props.user;
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let singleUserData: UserInterface | undefined;

  if (id < 1000) {
    const { data } = useGetSingleUserQuery(id);
    singleUserData = data;
  }
  const onCardClick = () => {
    setIsLoading(true);

    if (id < 1000) {
      const us = {
        ...singleUserData,
        image: `${singleUserData?.image}?lock=${singleUserData?.id}`,
      } as UserInterface;
      setCurrentUser(new UserData(us));
    } else {
      setCurrentUser(props.user);
    }
    setOpenModal(true);
    setIsLoading(false);
  };

  return (
    <>
      {isLoading &&
        createPortal(
          <div className="loader__background">
            <Loader />
          </div>,
          document.body
        )}
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

export default Card;
