import React, { FC, MouseEvent } from 'react';
import UserData from 'utils/UserData';
import './style.css';

export type ModalCardType = {
  user: UserData;
  onCloseFn: () => void;
};

const ModalCard: FC<ModalCardType> = (props) => {
  const {
    firstName,
    lastName,
    gender,
    birthday,
    age,
    animal,
    country,
    firstColor,
    secondColor,
    image,
  } = props.user;
  const firstStyle = {
    backgroundColor: firstColor,
  };
  const secondStyle = {
    backgroundColor: secondColor,
  };
  let src = '';
  if (typeof image === 'string') src = image;
  else if (image instanceof File) src = URL.createObjectURL(image);
  function closeModal(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (['modalCard__bg', 'modal-closeBtn'].includes(target.className)) props.onCloseFn();
  }

  return (
    <div className="modalCard__bg" onClick={closeModal}>
      <div className="modalCard__frame" role="modal-window">
        <button className="modal-closeBtn" onClick={closeModal}>
          x
        </button>
        <div className="card__names">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <img src={src} alt="user image" />
        <div className="modal-data__wrapper">
          <p>
            <span className="modalcard-data__property">Gender:</span> {gender}
          </p>
          <p>
            <span className="modalcard-data__property">Age:</span> {age}
          </p>
          <p>
            <span className="modalcard-data__property">Birthday:</span> {birthday}
          </p>
          <p>
            <span className="modalcard-data__property">Animal:</span>{' '}
            {animal.at(0)?.toUpperCase() + animal.slice(1)}
          </p>
          <p>
            <span className="modalcard-data__property">Country:</span> {country}
          </p>
        </div>
        <div className="appearance__wrapper">
          <div className="first-property__wrapper">
            <span className="first__property-name">First color:</span>
            <div className="appearance__first" style={firstStyle} />

            <span className="first__property">{firstColor}</span>
          </div>
          <div className="second-property__wrapper">
            <span className="second__property-name">Second color:</span>
            <div className="appearance__second" style={secondStyle} />

            <span className="second__property">{secondColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
