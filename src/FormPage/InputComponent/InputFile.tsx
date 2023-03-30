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
          required: 'Please load an image',
        })}
        style={{
          backgroundColor: errors ? 'mistyrose' : undefined,
        }}
      />
      {errors && <p>{errors.message}</p>}
    </label>
  );
};

export default InputDate;
