import React, { FC } from 'react';

import { InputCompProps } from '../../types/interfaces';

const InputStringComponent: FC<InputCompProps> = (props) => {
  const { inputName, type, register, errors } = props;
  return (
    <label>
      {`Enter the ${inputName.toLowerCase()}`}

      <input
        type={type}
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
/* const InputComponent: FC<InputComponentProps> = (props) => {
  const { inputName, type, error, reference } = props;
  return (
    <label>
      {inputName.includes('file')
        ? `Choose the file`
        : `Enter the ${inputName.includes('Input') ? inputName.replace('Input', '') : name}`}

      <input
        type={type}
        name={inputName}
        placeholder={inputName}
        max={props.options?.dateMax && props.options?.dateMax}
        accept={props.options?.acceptRes && props.options?.acceptRes}
        style={{ borderColor: error ? 'red' : undefined }}
      />
      {error && <p>{error}</p>}
    </label>
  );
}; */

export default InputStringComponent;
