import React, { FC } from 'react';
import './style.css';
import { FormProps, UserCustomFormInterface } from '../../types/interfaces';
import SelectComponent from '../SelectComponent';
import UserData from '../../utils/UserData';
import InputStringComponent from '../InputComponent';
import RadioComponent from '../RadioComponent';
import { SubmitHandler, useForm } from 'react-hook-form';
import InputDate from '../InputComponent/InputDate';
import InputFile from '../InputComponent/InputFile';

const Form: FC<FormProps> = ({ cardNumber, callback }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserCustomFormInterface>({ reValidateMode: 'onSubmit' });

  const onSubmit: SubmitHandler<UserCustomFormInterface> = (data) => {
    const file = data.imageFile?.[0];
    console.log('data', data);
    const user: UserData = new UserData({
      ...data,
      id: cardNumber,
      imageFile: file,
    });
    console.log('user', user);

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
        selectName={'firstColor'}
        register={register}
        selectOptions={['-', 'green', 'brown', 'grey', 'black', 'amber', 'blue']}
        selectError={errors.firstColor}
      />
      <SelectComponent
        selectName={'secondColor'}
        register={register}
        selectOptions={['-', 'blond', 'brown', 'chestnut', 'black', 'auburn']}
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
      <InputFile type="file" inputName="imageFile" register={register} errors={errors.imageFile} />
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
