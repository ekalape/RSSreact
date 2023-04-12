import React, { FC, useEffect, useState } from 'react';
import UserData from '../../utils/UserData';
import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';
import { useLazyGetSingleUserQuery } from '../../utils/QueryServices';
import { CardType, UserInterface } from '../../types/interfaces';

const Card: FC<CardType> = (props: CardType) => {
  const { id, firstName, lastName, country, image } = props.user;
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [getSingleCard, { isLoading: singleLoading, isError, data }, lastPromiseInfo] =
    useLazyGetSingleUserQuery({});

  const onCardClick = () => {
    setIsLoading(true);
    getSingleCard(id);

    setOpenModal(true);
    setIsLoading(false);
  };
  useEffect(() => {
    if (data) {
      const single = {
        ...data,
        image: `${data?.image}?lock=${data?.id}`,
      } as UserInterface;
      setCurrentUser(new UserData(single));
    }
  }, [data]);

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
