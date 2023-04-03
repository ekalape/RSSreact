import React, { FC } from 'react';
import UserData from 'utils/UserData';
import './style.css';

export type ModalCardType = {
  user: UserData;
  onCloseFn: () => void;
};

const ModalCard: FC<ModalCardType> = (props) => {
  const { firstName, lastName, gender, birthday, age, animal, city, eyeColor, hairColor, image } =
    props.user;
  console.log(hairColor);

  const eyeStyle = {
    backgroundColor: eyeColor,
  };
  const hairStyle = {
    backgroundColor: hairColor,
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
          <div className="eyes-property__wrapper">
            <span className="eyes__property-name">First color:</span>
            <div className="appearance__eyes" style={eyeStyle} />

            <span className="eyes__property">{eyeColor}</span>
          </div>
          <div className="hair-property__wrapper">
            <span className="hair__property-name">Second color:</span>
            <div className="appearance__hair" style={hairStyle} />

            <span className="hair__property">{hairColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
