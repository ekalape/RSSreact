import React, { FC } from 'react';
import { InputCompProps } from '../../types/interfaces';
const InputStringComponent: FC<InputCompProps> = (props) => {
  const { inputName, type, register, errors } = props;
  return (
    <label>
      {`Enter the ${inputName.toLowerCase()}`}

      <input
        type={type}
        placeholder={inputName}
        {...register(inputName, {
          required: 'This field is required',
          minLength: { value: 3, message: 'At least 3 letters' },
          pattern: {
            value: /[A-Z][a-z]{2,}/,
            message: 'Should start with capital letter',
          },
        })}
      />
      {errors && <p>{errors.message}</p>}
    </label>
  );
};

export default InputStringComponent;
