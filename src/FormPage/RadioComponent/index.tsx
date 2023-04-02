import React from 'react';
import { Component, ReactNode } from 'react';
import { RadioComponentProps } from '../../types/interfaces';

export default class RadioComponent extends Component<RadioComponentProps> {
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
}
