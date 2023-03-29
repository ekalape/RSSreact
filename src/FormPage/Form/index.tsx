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
    const age = new Date().getFullYear() - +data.birthDate.slice(0, 4);

    const user: UserData = new UserData({
      ...data,
      id: cardNumber,
      age: age,
      imageFile: file,
    });
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
      <InputFile type="file" inputName="imageFile" register={register} errors={errors.imageFile} />
      <label>
        {errors.agreeCheck && <p>{errors.agreeCheck.message}</p>}
        <input
          type="checkbox"
          {...register('agreeCheck', { required: 'This check is required' })}
          style={{ borderColor: errors.agreeCheck ? 'red' : undefined }}
        />
        I give my permission to create a card
      </label>
      <input type="submit" className="submit-btn" value="Submit" /* onClick={testSubmit}  */ />
    </form>
  );
};

export default Form;
