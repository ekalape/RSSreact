import React, { FC } from 'react';
import { InputCompProps } from '../../types/interfaces';
const InputDate: FC<InputCompProps> = (props) => {
  const { inputName, type, register, errors } = props;
  return (
    <label>
      {`Choose the image`}
      <input
        type={type}
        accept="image/*"
        {...register(inputName, {
          required: 'Load an image',
        })}
      />
      {errors && <p>{errors.message}</p>}
    </label>
  );
};

export default InputDate;
