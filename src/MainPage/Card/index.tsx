import React, { FC, Suspense, useEffect, useState } from 'react';
import { getUser } from '../../utils';
import UserData from '../../utils/UserData';
import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';

export type CardType = {
  user: UserData;
  handleCardClick?: (u: UserData) => void;
};

const Card: FC<CardType> = (props: CardType) => {
  const { id, firstName, lastName, country, image } = props.user;
  const [userId, setUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [openModal, setOpenModal] = useState(false);

  let src = '';
  if (typeof image === 'string') src = image;
  else if (image instanceof File) src = URL.createObjectURL(image);
  const onCardClick = () => {
    if (props.handleCardClick) {
      props.handleCardClick(props.user);
    }
    setUserId(id);
  };
  useEffect(() => {
    (async () => {
      if (userId) {
        const user = await getUser(userId);
        if (typeof user !== 'string') {
          setCurrentUser(new UserData(user));
          setOpenModal(true);
        } else alert(user);
      }
    })();
  }, [userId]);

  return (
    <>
      {openModal &&
        currentUser &&
        createPortal(
          <Suspense fallback={<Loader />}>
            <ModalCard
              user={currentUser}
              onCloseFn={() => {
                setOpenModal(false);
                setUserId(null);
              }}
            />
          </Suspense>,
          document.body
        )}
      <div className="card__wrapper" onClick={onCardClick} role="single-card">
        <img src={src} alt="user image" />
        <div className="card__names">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <div className="card-data__wrapper">
          <p>
            <span className="card-data__property">Country:</span> {country}
          </p>
        </div>
      </div>{' '}
    </>
  );
};

export default Card;
