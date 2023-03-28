import React, { createRef, FC } from 'react';
import './style.css';
import {
  FormProps,
  FormReadyCheck,
  GeneralOptions,
  InputCompProps,
  UserCustomInterface,
} from '../../types/interfaces';
import SelectComponent from '../SelectComponent';
import UserData from '../../utils/UserData';
import InputStringComponent from '../InputComponent';
import RadioComponent from '../RadioComponent';

import validationCheck from '../../utils/validationCheck';
import { Path, SubmitHandler, useForm, UseFormRegister } from 'react-hook-form';
import InputDate from '../InputComponent/InputDate';

const Form: FC<FormProps> = ({ cardNumber, callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCustomInterface>();
  const onSubmit: SubmitHandler<UserCustomInterface> = (data) => {
    console.log(data);
    const user: UserData = new UserData({ ...data, id: cardNumber });
    callback(user);
    reset();
  };

  return (
    <form className="form__wrapper" role="form" onSubmit={handleSubmit(onSubmit)}>
      <h3>Compile the form:</h3>
      <InputStringComponent
        type="text"
        inputName="firstName"
        register={register}
        errors={errors.firstName}
      />
      <InputStringComponent
        type="text"
        inputName="lastName"
        register={register}
        errors={errors.lastName}
      />
      <RadioComponent inputName={'gender'} errors={errors.gender} register={register} />
      <InputStringComponent type="text" inputName="city" register={register} errors={errors.city} />
      <InputDate
        type="date"
        inputName="birthDate"
        register={register}
        errors={errors.birthDate}
        max="2010-12-31"
      />
      <SelectComponent
        selectName={'eyeColor'}
        register={register}
        selectOptions={['-', 'green', 'brown', 'grey', 'black', 'amber', 'blue']}
        selectError={errors.eyeColor}
      />
      <SelectComponent
        selectName={'hairColor'}
        register={register}
        selectOptions={['-', 'blond', 'brown', 'chestnut', 'black', 'auburn']}
        selectError={errors.hairColor}
      />
      <SelectComponent
        selectName={'hairType'}
        register={register}
        selectOptions={['-', 'weavy', 'straight', 'curly', 'very curly', 'strands']}
        selectError={errors.hairType}
      />
      <input type="submit" className="submit-btn" value="Submit" />
    </form>
  );
};

export default Form;
