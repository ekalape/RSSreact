import React, { FC } from 'react';
import { Component, ReactNode } from 'react';
import { InputRadioProps, RadioComponentProps } from '../../types/interfaces';

const RadioComponent: FC<InputRadioProps> = (props) => {
  const { inputName, register, errors } = props;
  return (
    <div className="gender-switcher">
      <span> Choose gender:</span>
      <div>
        <input
          className={'gender-radio__input'}
          type="radio"
          {...register(`${inputName}`, {
            value: 'male',
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
          {...register(`${inputName}`, {
            value: 'female',
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

/* export default class RadioComponent extends Component<RadioComponentProps> {
  render(): ReactNode {
    const { name, referenceMale, referenceFemale, genderError } = this.props;

    return (
      <div className="gender-switcher">
        <span> Choose gender:</span>
        <div>
          <input
            className={'gender-radio__input'}
            type="radio"
            name={name}
            id={`${name}-male`}
            ref={referenceMale}
          />
          <label className={'gender-radio__label'} htmlFor={`${name}-male`}>
            Male
          </label>
        </div>
        <div>
          <input
            className={'gender-radio__input'}
            type="radio"
            name={name}
            id={`${name}-female`}
            ref={referenceFemale}
          />
          <label className={'gender-radio__label'} htmlFor={`${name}-female`}>
            Female
          </label>
        </div>
        {genderError && <p className="gender-error">{genderError}</p>}
      </div>
    );
  }
} */
