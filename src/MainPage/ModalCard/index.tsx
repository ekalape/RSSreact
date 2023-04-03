import React, { FC } from 'react';
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
    city,
    firstColor,
    secondColor,
    image,
  } = props.user;
  console.log('firstColor', firstColor);

  const firstStyle = {
    backgroundColor: firstColor,
  };
  const secondStyle = {
    backgroundColor: secondColor,
  };
  let src = '';
  if (typeof image === 'string') src = image;
  else if (image instanceof File) src = URL.createObjectURL(image);
  function closeModal() {
    props.onCloseFn();
  }
  return (
    <div className="modalCard__bg">
      <div className="modalCard__frame">
        <button className="modal-closeBtn" onClick={closeModal}>
          x
        </button>
        <div className="card__names">
          <p>{firstName}</p>
          <p>{lastName}</p>
        </div>
        <img src={src} alt="user image" />
        <div className="card-data__wrapper">
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
            <span className="modalcard-data__property">Animal:</span> {animal}
          </p>
          <p>
            <span className="modalcard-data__property">City:</span> {city}
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
