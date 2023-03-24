import React, { createRef } from 'react';
import './style.css';

import { FormProps, FormReadyCheck, FormState, UserCustomInterface } from '../../types/interfaces';
import SelectComponent from '../SelectComponent';
import UserData from '../../utils/UserData';
import InputComponent from '../InputComponent';
import RadioComponent from '../RadioComponent';

import validationCheck from '../../utils/validationCheck';

export default class Form extends React.Component<FormProps, FormState> {
  form: React.RefObject<HTMLFormElement>;
  firstnameInput: React.RefObject<HTMLInputElement>;
  lastnameInput: React.RefObject<HTMLInputElement>;
  cityInput: React.RefObject<HTMLInputElement>;
  genderMaleInput: React.RefObject<HTMLInputElement>;
  genderFemaleInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  eyeColorSelectInput: React.RefObject<HTMLSelectElement>;
  hairColorSelectInput: React.RefObject<HTMLSelectElement>;
  hairTypeSelectInput: React.RefObject<HTMLSelectElement>;
  agreeCheckInput: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;

  readyToCreate: FormReadyCheck;

  constructor(props: FormProps) {
    super(props);
    this.form = createRef();
    this.firstnameInput = createRef();
    this.lastnameInput = createRef();
    this.cityInput = createRef();
    this.genderMaleInput = createRef();
    this.genderFemaleInput = createRef();
    this.dateInput = createRef();
    this.eyeColorSelectInput = createRef();
    this.hairColorSelectInput = createRef();
    this.hairTypeSelectInput = createRef();
    this.agreeCheckInput = createRef();
    this.fileInput = createRef();

    this.state = {
      firstNameError: '',
      lastNameError: '',
      cityError: '',
      dateError: '',
      agreeCheckError: '',
      fileInputError: '',
    };
    this.readyToCreate = {
      firstName: false,
      lastName: false,
      city: false,
      date: false,
      agree: false,
      file: false,
    };
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    this.validityCheck();

    const allFilled = Object.entries(this.readyToCreate).every((field) => field[1] === true);
    if (allFilled) this.createCard();
  }

  createCard() {
    let userAge = 0;

    const date = this.dateInput.current?.value as string;
    userAge = new Date().getFullYear() - +date.slice(0, 4);

    const files = this.fileInput.current?.files;
    let file;
    if (files && files.length > 0) {
      file = files[0];
    }

    const filledFields: UserCustomInterface = {
      id: this.props.cardNumber,
      firstName: this.firstnameInput.current?.value as string,
      lastName: this.lastnameInput.current?.value as string,
      city: this.cityInput.current?.value as string,
      gender: this.genderMaleInput.current?.checked ? 'male' : 'female',
      birthDate: this.dateInput.current?.value as string,
      age: userAge,
      eyeColor: this.eyeColorSelectInput.current?.value as string,
      hair: {
        color: this.hairColorSelectInput.current?.value as string,
        type: this.hairTypeSelectInput.current?.value as string,
      },
      imageFile: file,
    };

    const card = new UserData(filledFields);
    this.props.callback(card);
    this.form.current?.reset();
  }

  setError(errorName: string, errorValue: string) {
    this.setState({ [errorName]: errorValue });
  }

  validityCheck() {
    this.readyToCreate.firstName = validationCheck(
      'firstNameError',
      this.firstnameInput.current?.value,
      this.setError.bind(this)
    );

    this.readyToCreate.lastName = validationCheck(
      'lastNameError',
      this.lastnameInput.current?.value,
      this.setError.bind(this)
    );

    this.readyToCreate.city = validationCheck(
      'cityError',
      this.cityInput.current?.value,
      this.setError.bind(this)
    );

    if (!this.dateInput.current?.value) {
      this.setState({ dateError: 'The date is required' });
      this.readyToCreate.date = false;
    } else {
      this.setState({ dateError: '' });
      this.readyToCreate.date = true;
    }
    if (!this.fileInput.current?.value) {
      this.setState({ fileInputError: 'You have to upload a file' });
      this.readyToCreate.file = false;
    } else {
      this.setState({ fileInputError: '' });
      this.readyToCreate.file = true;
    }
    if (!this.agreeCheckInput.current?.checked) {
      this.setState({ agreeCheckError: 'This check is required' });
      this.readyToCreate.agree = false;
    } else {
      this.setState({ agreeCheckError: '' });
      this.readyToCreate.agree = true;
    }

    if (!(this.genderMaleInput.current?.checked || this.genderFemaleInput.current?.checked)) {
      this.setState({ genderError: 'This check is required' });
      this.readyToCreate.agree = false;
    } else {
      this.setState({ genderError: '' });
      this.readyToCreate.agree = true;
    }
  }

  render(): React.ReactNode {
    return (
      <form
        className="form__wrapper"
        role={'form'}
        onSubmit={this.handleSubmit.bind(this)}
        ref={this.form}
      >
        <h3>Compile the form:</h3>
        <InputComponent
          name={'firstname'}
          type={'text'}
          error={this.state.firstNameError}
          reference={this.firstnameInput}
        />
        <InputComponent
          name={'lastname'}
          type={'text'}
          error={this.state.lastNameError}
          reference={this.lastnameInput}
        />
        <RadioComponent
          name={'inputRadio'}
          referenceMale={this.genderMaleInput}
          referenceFemale={this.genderFemaleInput}
          genderError={this.state.genderError}
        />

        <InputComponent
          name={'city'}
          type={'text'}
          error={this.state.cityError}
          reference={this.cityInput}
        />
        <InputComponent
          name={'dateInput'}
          type={'date'}
          error={this.state.dateError}
          reference={this.dateInput}
          options={{ max: '2010-12-31' }}
        />

        <SelectComponent
          selectName="eyeColor"
          selectOptions={['green', 'brown', 'grey', 'black', 'amber', 'blue']}
          reference={this.eyeColorSelectInput}
        />
        <SelectComponent
          selectName="hairColor"
          selectOptions={['blond', 'brown', 'chestnut', 'black', 'auburn']}
          reference={this.hairColorSelectInput}
        />
        <SelectComponent
          selectName="hairType"
          selectOptions={['weavy', 'straight', 'curly', 'very curly', 'strands']}
          reference={this.hairTypeSelectInput}
        />
        <InputComponent
          name={'fileInput'}
          type={'file'}
          error={this.state.fileInputError}
          reference={this.fileInput}
          options={{ accept: 'image/*' }}
        />

        <label>
          {this.state.agreeCheckError && <p>{this.state.agreeCheckError}</p>}
          <input
            type="checkbox"
            name="agreeCheck"
            id="agreeCheck"
            ref={this.agreeCheckInput}
            style={{ borderColor: this.state.agreeCheckError ? 'red' : undefined }}
          />
          I give my permission to create a card
        </label>
        <input type="submit" className="submit-btn" value="Submit" />
      </form>
    );
  }
}
