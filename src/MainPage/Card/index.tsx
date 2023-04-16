import React, { FC, useState } from 'react';
import UserData from '../../utils/UserData';
import './style.css';
import ModalCard from '../../MainPage/ModalCard';
import { createPortal } from 'react-dom';
import Loader from '../../UnrelatedComponents/Loader';
import { useLazyGetSingleUserQuery } from '../../utils/QueryServices';
import { CardType, UserInterface } from '../../types/interfaces';
import ModalInfoComponent from '../../UnrelatedComponents/ModalInfoComponent';

const Card: FC<CardType> = (props: CardType) => {
  const { id, firstName, lastName, country, image } = props.user;
  const [openModal, setOpenModal] = useState(false);

  const [getSingleCard, { isFetching: singleLoading, isError, data }] = useLazyGetSingleUserQuery();

  const onCardClick = () => {
    getSingleCard(id);
    setOpenModal(true);
  };

  function createUserDataFrame() {
    const single = {
      ...data,
      image: `${data?.image}?lock=${data?.id}`,
    } as UserInterface;
    return new UserData(single);
  }

  return (
    <>
      {isError &&
        createPortal(<ModalInfoComponent text={'Seems there is a problem...'} />, document.body)}
      {singleLoading && createPortal(<Loader />, document.body)}
      {openModal &&
        data &&
        createPortal(
          <ModalCard
            user={createUserDataFrame()}
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
