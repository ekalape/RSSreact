import React, { FC, useEffect, useState } from 'react';
import { getUser } from '../../utils';
import UserData from '../../utils/UserData';
import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';

export type CardType = {
  user: UserData;
};

const Card: FC<CardType> = (props: CardType) => {
  const { id, firstName, lastName, country, image } = props.user;
  const [userId, setUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCardClick = () => {
    setUserId(id);
  };
  useEffect(() => {
    (async () => {
      if (userId) {
        setIsLoading(true);
        const user = props.user;
        if (userId < 1000) {
          getUser(userId)
            .then((u) => {
              if (u) setCurrentUser(new UserData(u));
            })
            .catch(() => alert('no such user'));
        } else {
          setCurrentUser(user);
        }
        setOpenModal(true);
        setIsLoading(false);
      }
    })();
  }, [userId]);

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
              setUserId(null);
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
