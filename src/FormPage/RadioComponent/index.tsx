import React, { FC } from 'react';
import { InputRadioProps } from '../../types/interfaces';

const RadioComponent: FC<InputRadioProps> = (props) => {
  const { inputName, register, errors } = props;
  return (
    <div className="gender-switcher">
      <span> Choose gender:</span>
      <div>
        <input
          className={'gender-radio__input'}
          type="radio"
          value="male"
          {...register(`${inputName}`, {
            required: 'This field is required',
          })}
          id={`radioInput-male`}
        />
        <label className={'gender-radio__label'} htmlFor={`radioInput-male`}>
          Male
        </label>
      </div>
      <div>
        <input
          className={'gender-radio__input'}
          type="radio"
          value="female"
          {...register(`${inputName}`, {
            required: 'This field is required',
          })}
          id={`radioInput-female`}
        />
        <label className={'gender-radio__label'} htmlFor={`radioInput-female`}>
          Female
        </label>
      </div>
      {errors && <p className="gender-error">{errors.message}</p>}
    </div>
  );
};

export default RadioComponent;
