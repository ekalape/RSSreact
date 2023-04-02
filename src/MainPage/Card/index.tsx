import React, { FC } from 'react';
import UserData from 'utils/UserData';
import './style.css';

export type CardType = {
  user: UserData;
  handleCardClick: (userCard: UserData) => void;
};

const Card: FC<CardType> = (props: CardType) => {
  const { handleCardClick } = props;
  const { firstName, lastName, city, image } = props.user;

  let src = '';
  if (typeof image === 'string') src = image;
  else if (image instanceof File) src = URL.createObjectURL(image);
  const onCardClick = () => {
    handleCardClick(props.user);
  };

  return (
    <div className="card__wrapper" onClick={onCardClick}>
      <img src={src} alt="user image" />
      <div className="card__names">
        <p>{firstName}</p>
        <p>{lastName}</p>
      </div>
      <div className="card-data__wrapper">
        <p>
          <span className="card-data__property">City:</span> {city}
        </p>
      </div>
    </div>
  );
};

export default Card;
