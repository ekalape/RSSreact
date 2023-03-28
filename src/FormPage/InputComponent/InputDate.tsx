import React, { FC } from 'react';
import { InputCompProps } from '../../types/interfaces';
const InputDate: FC<InputCompProps & { max: string }> = (props) => {
  const { inputName, type, register, errors, max } = props;
  return (
    <label>
      {`Choose the date`}
      <input
        type={type}
        max={max}
        {...register(inputName, {
          required: 'Input the birth date',
        })}
      />
      {errors && <p>{errors.message}</p>}
    </label>
  );
};

export default InputDate;
