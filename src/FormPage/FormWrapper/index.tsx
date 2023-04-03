import Form from '../Form/';
import React, { useRef, useState } from 'react';
import './style.css';
import UserData from '../../utils/UserData';
import Card from '../../MainPage/Card';
import ModalInfoComponent from '../../UnrelatedComponents/ModalInfoComponent';
import { createPortal } from 'react-dom';
import ModalCard from '../../MainPage/ModalCard';

const FormPage = () => {
  const cardNumber = useRef(0);
  const [cards, setCards] = useState<UserData[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
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
      {openModal &&
        currentUser &&
        createPortal(
          <ModalCard user={currentUser} onCloseFn={() => setOpenModal(false)} />,
          document.body
        )}
      {showMessage && <ModalInfoComponent />}
      <div className="formsPage__wrapper" role={'forms-page'}>
        <Form cardNumber={cardNumber.current} callback={handleFormWrapperState} />
        <div className="main__cards-container" role="form-cards-container">
          {cards.map((card) => (
            <Card
              user={card}
              handleCardClick={(u) => {
                setCurrentUser(u);
                setOpenModal(true);
              }}
              key={card.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
export default FormPage;
