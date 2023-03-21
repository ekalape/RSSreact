import React, { createRef } from 'react';
import './style.css';

import { UserCustomInterface } from '../../types/interfaces';
import SelectComponent from '../SelectComponent';
import UserData from '../../utils/UserData';

export interface FormState {
  firstNameError: string;
  lastNameError: string;
  cityError: string;
  dateError: string;
  agreeCheckError: string;
  fileInputError: string;
}
export interface FormFields {
  [property: string]: string | number | undefined;
}

export interface FormProps {
  cardNumber: number;
  callback: (user: UserData) => void;
}
export interface FormReadyCheck {
  firstName: boolean;
  lastName: boolean;
  city: boolean;
  date: boolean;
  agree: boolean;
  file: boolean;
}

export default class Form extends React.Component<FormProps, FormState> {
  firstnameInput: React.RefObject<HTMLInputElement>;
  lastnameInput: React.RefObject<HTMLInputElement>;
  cityInput: React.RefObject<HTMLInputElement>;
  genderMaleInput: React.RefObject<HTMLInputElement>;
  genderFemaleInput: React.RefObject<HTMLInputElement>;
  dateInput: React.RefObject<HTMLInputElement>;
  eyeColorSelectInput: React.RefObject<SelectComponent>;
  hairColorSelectInput: React.RefObject<SelectComponent>;
  hairTypeSelectInput: React.RefObject<SelectComponent>;
  agreeCheckInput: React.RefObject<HTMLInputElement>;
  fileInput: React.RefObject<HTMLInputElement>;

  readyToCreate: FormReadyCheck;
  constructor(props: FormProps) {
    super(props);

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
    console.log('this.state', this.state);
    const allFilled = Object.entries(this.readyToCreate).every((field) => field[1] === true);
    if (allFilled) this.createCard();
  }

  handleFileSelect = async (file: File) => {
    const reader = new FileReader(); // create a FileReader object
    /* reader.onloadend = () => {
      setDataUrl(reader.result as string); // update state with data URL when reading is done
    }; */
    reader.readAsDataURL(file); // read file content as data URL
    return await createImageBitmap(file);
  };
  async createCard() {
    let userAge = 0;
    if (!this.state.dateError) {
      const date = this.dateInput.current?.value as string;
      userAge = new Date().getFullYear() - +date.slice(0, 4);
    }
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
        type: this.hairColorSelectInput.current?.value as string,
      },
      imageFile: file,
    };
    console.log(filledFields);
    const card = new UserData(filledFields);
    this.props.callback(card);
    if (this.firstnameInput.current) this.firstnameInput.current.value = '';
    if (this.lastnameInput.current) this.lastnameInput.current.value = '';
    if (this.cityInput.current) this.cityInput.current.value = '';
    if (this.dateInput.current) this.dateInput.current.value = '';
    if (this.agreeCheckInput.current) this.agreeCheckInput.current.checked = false;
    if (this.fileInput.current) this.fileInput.current.value = '';
  }

  validityCheck() {
    if (!this.firstnameInput.current?.value) {
      this.setState({ firstNameError: 'The firstname is required' });
      this.readyToCreate.firstName = false;
    } else if (this.firstnameInput.current?.value.length < 3) {
      this.setState({ firstNameError: 'The firstname should be 3+ letters length' });
      this.readyToCreate.firstName = false;
    } else if (!this.firstnameInput.current?.value.at(0)?.match(/[A-Z]/)) {
      this.setState({ firstNameError: 'The firstname should be capitalized' });
      this.readyToCreate.firstName = false;
    } else {
      this.setState({ firstNameError: '' });
      this.readyToCreate.firstName = true;
    }

    if (!this.lastnameInput.current?.value) {
      this.setState({ lastNameError: 'The lastname is required' });
      this.readyToCreate.lastName = false;
    } else if (this.lastnameInput.current?.value.length < 3) {
      this.setState({ lastNameError: 'The lastname should be 3+ letters length' });
      this.readyToCreate.lastName = false;
    } else if (!this.lastnameInput.current?.value.at(0)?.match(/[A-Z]/)) {
      this.setState({ lastNameError: 'The lastname should be capitalized' });
      this.readyToCreate.lastName = false;
    } else {
      this.setState({ lastNameError: '' });
      this.readyToCreate.lastName = true;
    }

    if (!this.cityInput.current?.value) {
      this.setState({ cityError: 'The city name is required' });
      this.readyToCreate.city = false;
    } else if (this.cityInput.current?.value.length < 3) {
      this.setState({ cityError: 'The city name should be 3+ letters length' });
      this.readyToCreate.city = false;
    } else if (!this.cityInput.current?.value.at(0)?.match(/[A-Z]/)) {
      this.setState({ cityError: 'The city name should be capitalized' });
      this.readyToCreate.city = false;
    } else {
      this.setState({ cityError: '' });
      this.readyToCreate.city = true;
    }

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
  }

  render(): React.ReactNode {
    return (
      <form className="form__wrapper" role={'form'} onSubmit={this.handleSubmit.bind(this)}>
        <h3>Compile the form</h3>
        <label>
          Enter the firstname
          <input
            type="text"
            name="firstname"
            ref={this.firstnameInput}
            style={{ borderColor: this.state.firstNameError ? 'red' : undefined }}
          />
          {this.state.firstNameError && <p>{this.state.firstNameError}</p>}
        </label>
        <label>
          Enter the lastname
          <input
            type="text"
            name="lastname"
            ref={this.lastnameInput}
            style={{ borderColor: this.state.lastNameError ? 'red' : undefined }}
          />
          {this.state.lastNameError && <p>{this.state.lastNameError}</p>}
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
          <input
            type="text"
            name="citi"
            ref={this.cityInput}
            style={{ borderColor: this.state.cityError ? 'red' : undefined }}
          />
          {this.state.cityError && <p>{this.state.cityError}</p>}
        </label>

        <label>
          Enter your birth date
          <input
            type="date"
            name="dateInput"
            id="dateInput"
            ref={this.dateInput}
            max="2010-12-31"
            style={{ borderColor: this.state.dateError ? 'red' : undefined }}
          />
          {this.state.dateError && <p>{this.state.dateError}</p>}
        </label>

        <SelectComponent
          selectName="eyeColor"
          selectOptions={['green', 'brown', 'grey', 'black', 'amber', 'blue']}
          ref={this.eyeColorSelectInput}
        />
        <SelectComponent
          selectName="hairColor"
          selectOptions={['blond', 'brown', 'chestnut', 'black', 'auburn']}
          ref={this.hairColorSelectInput}
        />
        <SelectComponent
          selectName="hairType"
          selectOptions={['weavy', 'straight', 'curly', 'very curly', 'strands']}
          ref={this.hairTypeSelectInput}
        />

        <label>
          <input type="checkbox" name="agreeCheck" id="agreeCheck" ref={this.agreeCheckInput} />I
          give my permission to create a card
          {this.state.agreeCheckError && <p>{this.state.agreeCheckError}</p>}
        </label>
        <label>
          Add the foto
          <input type="file" name="fileInput" id="fileInput" ref={this.fileInput} />
        </label>

        <input type="submit" className="submit-btn" value="Submit" />
      </form>
    );
  }
}
