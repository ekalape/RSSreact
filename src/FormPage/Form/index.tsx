import React, { useState } from 'react';
import './style.css';
import { UserCustomFormInterface, UserInterface } from '../../types/interfaces';
import SelectComponent from '../SelectComponent';
import InputStringComponent from '../InputComponent';
import RadioComponent from '../RadioComponent';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputDate from '../InputComponent/InputDate';
import InputFile from '../InputComponent/InputFile';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomUserRdc } from '../../store/dataSlice';
import { RootStateType } from '../../store';
import { createPortal } from 'react-dom';
import ModalInfoComponent from '../../UnrelatedComponents/ModalInfoComponent';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCustomFormInterface>({ reValidateMode: 'onSubmit' });
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const customUsers: UserInterface[] = useSelector((state: RootStateType) => state.customUsers);
  let cardNumber =
    customUsers.reduce((acc, u) => {
      if (u.id > acc) return u.id;
      else return acc;
    }, 1000) || 1000;

  const onSubmit: SubmitHandler<UserCustomFormInterface> = (data) => {
    setShowMessage(true);
    const file = data.image?.[0];
    const imageUrl = file ? URL.createObjectURL(file) : '';

    const user: UserInterface = {
      ...data,
      id: ++cardNumber,
      image: imageUrl,
    };
    dispatch(addCustomUserRdc({ customUser: user }));

    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
      reset();
    }, 800);
  };

  return (
    <form className="form__wrapper" role="form" onSubmit={handleSubmit(onSubmit)}>
      {showMessage && createPortal(<ModalInfoComponent />, document.body)}
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
      <InputStringComponent
        type="text"
        inputName="country"
        register={register}
        errors={errors.country}
      />
      <InputDate
        type="date"
        inputName="birthDate"
        register={register}
        errors={errors.birthDate}
        max="2010-12-31"
      />
      <SelectComponent
        selectName={'firstColor'}
        register={register}
        selectOptions={[
          '-',
          'lightsalmon',
          'mediumpurple',
          'midnightblue',
          'mediumvioletred',
          'royalblue',
          'saddlebrown',
          'springgreen',
          'yellowgreen',
        ]}
        selectError={errors.firstColor}
      />
      <SelectComponent
        selectName={'secondColor'}
        register={register}
        selectOptions={['-', 'blue', 'brown', 'green', 'black', 'yellow', 'purple', 'teal', 'gray']}
        selectError={errors.secondColor}
      />
      <SelectComponent
        selectName={'animal'}
        register={register}
        selectOptions={[
          '-',
          'Dog',
          'Rabbit',
          'Horse',
          'Cat',
          'Beaver',
          'Giraffe',
          'Chameleon',
          'Hamster',
          'Antelope',
          'Orangutan',
          'Tiger',
        ]}
        selectError={errors.animal}
      />
      <InputFile type="file" inputName="image" register={register} errors={errors.image} />
      <label
        style={{
          backgroundColor: errors.agreeCheck ? 'mistyrose' : undefined,
        }}
      >
        {errors.agreeCheck && <p>{errors.agreeCheck.message}</p>}
        <input
          type="checkbox"
          {...register('agreeCheck', { required: 'This check is required' })}
        />
        I give my permission to create a card
      </label>
      <input type="submit" className="submit-btn" value="Submit" />
    </form>
  );
};

export default Form;
