import Form from '../Form/';
import React from 'react';
import './style.css';
import UserData from '../../utils/UserData';
import { UserInterface } from '../../types/interfaces';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../store';
import FormCard from '../../FormPage/FormCard';

const FormPage = () => {
  const customUsers: UserInterface[] = useSelector(
    (state: RootStateType) => state.customDataReducer.customUsers
  );

  return (
    <div className="formsPage__wrapper" role={'forms-page'}>
      <Form />
      <div className="main__cards-container" role="form-cards-container">
        {customUsers.map((card) => (
          <FormCard user={new UserData(card)} key={card.id} />
        ))}
      </div>
    </div>
  );
};
export default FormPage;
