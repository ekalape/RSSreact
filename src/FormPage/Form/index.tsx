import React, { createRef } from 'react';
import './style.css';

import { EmptyProps } from '../../types/interfaces';

export interface FormState {
  /*   firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  city: string;
  height: number; */
  [property: string]: string | number;
}

export default class Form extends React.Component<EmptyProps, FormState> {
  firstnameInput: React.RefObject<HTMLInputElement>;
  lastnameInput: React.RefObject<HTMLInputElement>;
  cityInput: React.RefObject<HTMLInputElement>;
  genderMaleInput: React.RefObject<HTMLInputElement>;
  genderFemaleInput: React.RefObject<HTMLInputElement>;
  constructor(props: EmptyProps) {
    super(props);

    this.firstnameInput = createRef();
    this.lastnameInput = createRef();
    this.cityInput = createRef();
    this.genderMaleInput = createRef();
    this.genderFemaleInput = createRef();
  }

  componentDidMount(): void {}
  handleInputState(property: string /* Pick<FormState, keyof FormState> */, val: string | number) {
    this.setState({ [property]: val });
  }
  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const filledFields = {
      firstName: this.firstnameInput.current?.value,
      lastName: this.lastnameInput.current?.value,
      city: this.cityInput.current?.value,
      gender: this.genderMaleInput.current?.checked
        ? this.genderMaleInput.current?.value
        : this.genderFemaleInput.current?.value,
    };
    console.log(filledFields);
  }
  render(): React.ReactNode {
    return (
      <form className="form__wrapper" role={'form'} onSubmit={this.handleSubmit.bind(this)}>
        <h3>Compile the form</h3>
        <label>
          Enter the firstname
          <input type="text" name="firstname" ref={this.firstnameInput} />
        </label>
        <label>
          Enter the lastname
          <input type="text" name="lastname" ref={this.lastnameInput} />
        </label>
        <div className="gender-switcher">
          Choose the gender:
          <br />
          <label>
            Male
            <input
              defaultChecked
              type="radio"
              name="genderInput"
              id="genderInput-male"
              value="male"
              ref={this.genderMaleInput}
            />
          </label>
          <label>
            Female
            <input
              type="radio"
              name="genderInput"
              id="genderInput-female"
              value="female"
              ref={this.genderFemaleInput}
            />
          </label>
        </div>
        <label>
          Enter the city
          <input type="text" name="citi" ref={this.cityInput} />
        </label>

        <input type="submit" className="submit-btn" value="Submit" />
      </form>
    );
  }
}
