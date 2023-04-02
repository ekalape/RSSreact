import React, { FC } from 'react';
import UserData from 'utils/UserData';
import './style.css';

export type ModalCardType = {
  user: UserData;
  onCloseFn: () => void;
};

const ModalCard: FC<ModalCardType> = (props) => {
  const { firstName, lastName, gender, age, birthday, hairType, city, eyeColor, hairColor, image } =
    props.user;
  const eyeStyle = {
    backgroundColor:
      eyeColor.toLowerCase() === 'amber'
        ? '#d8870d'
        : eyeColor.toLowerCase() === 'brown'
        ? '#461907'
        : eyeColor.toLowerCase() === 'blue'
        ? '#2f4ac2'
        : eyeColor.toLowerCase() === 'green'
        ? '#2c4b17'
        : eyeColor.toLowerCase(),
    color: eyeColor.toLowerCase() === 'amber' ? 'black' : 'white',
  };
  const hairStyle = {
    backgroundColor:
      hairColor.toLowerCase() === 'blond'
        ? '#e2cba8'
        : hairColor.toLowerCase() === 'brown'
        ? '#461907'
        : hairColor.toLowerCase() === 'chestnut'
        ? '#862c11'
        : hairColor.toLowerCase() === 'auburn'
        ? '#ff6600'
        : hairColor.toLowerCase(),
    color: hairColor.toLowerCase() === 'blond' ? 'black' : 'white',
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
            <span className="card-data__property">Gender:</span> {gender}
          </p>
          <p>
            <span className="card-data__property">Age:</span> {age}
          </p>
          <p>
            <span className="card-data__property">Birthday:</span> {birthday}
          </p>
          <p>
            <span className="card-data__property">Hair type:</span> {hairType}
          </p>
          <p>
            <span className="card-data__property">City:</span> {city}
          </p>
        </div>
        <div className="appearance__wrapper">
          <div className="appearance__eyes" style={eyeStyle}>
            <span className="eyes__property">{eyeColor}</span>
          </div>
          <div className="appearance__hair" style={hairStyle}>
            {' '}
            <span className="hair__property">{hairColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCard;
