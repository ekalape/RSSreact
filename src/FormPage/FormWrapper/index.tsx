import Form from '../Form/';
import React, { useRef, useState } from 'react';
import './style.css';
import UserData from '../../utils/UserData';
import Card from '../../MainPage/Card';
import ModalInfoComponent from '../../UnrelatedComponents/ModalInfoComponent';

const FormPage = () => {
  const cardNumber = useRef(0);
  const [cards, setCards] = useState<UserData[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  function handleFormWrapperState(card: UserData) {
    setShowMessage(true);
    setTimeout(() => {
      setCards((prev) => [...prev, card]);
      cardNumber.current++;
      setShowMessage(false);
    }, 800);
  }
  return (
    <>
      {showMessage && <ModalInfoComponent />}
      <div className="formsPage__wrapper" role={'forms-page'}>
        <Form cardNumber={cardNumber.current} callback={handleFormWrapperState} />
        <div className="main__cards-container" role="form-cards-container">
          {cards.map((card) => (
            <Card {...card} key={card.id} />
          ))}
        </div>
      </div>
    </>
  );
};
export default FormPage;
