import { FieldError, FieldErrors, UseFormRegister } from 'react-hook-form';
import UserData from '../utils/UserData';

export type EmptyProps = {
  children?: React.ReactNode;
};

export interface SearchWordInterface {
  searchWord: string;
}
export interface UserHairProp {
  color: string;
  type: string;
}
export interface UserAddressProp {
  address: string;
  city: string;
  coordinates: { lat: number; lng: number };
  postalCode: string;
  state: string;
}

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  eyeColor: string;
  image: string;
  hair: UserHairProp;
  birthDate: string;
  address: UserAddressProp;
}
export type UserCustomInterface = Omit<UserInterface, 'address' | 'image'> & {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: 'male' | 'female';
  eyeColor: string;

  hairColor: string;
  hairType: string;
  birthDate: string;
  city: string;
  imageFile: File | undefined;
};
export type UserCustomFormInterface = Omit<UserCustomInterface, 'imageFile'> & {
  imageFile: FileList | undefined;
  agreeCheck?: boolean;
};
export interface SearchProps {
  callback: (searchWord: string) => void;
}
export type GeneralOptions = {
  [key: string]: string;
};
export interface FormFields {
  [property: string]: string | number | undefined;
}

export interface FormProps {
  cardNumber: number;
  callback: (user: UserData) => void;
}
export interface FormReadyCheck {
  [key: string]: boolean;
}
export interface InputComponentProps {
  inputName: string;
  type: string;
  error: string;
  reference: React.RefObject<HTMLInputElement>;
  options?: GeneralOptions;
}

export interface FormWrapperState {
  cards: UserData[];
  showMessage: boolean;
}

export interface RadioComponentProps {
  name: string;
  referenceMale: React.RefObject<HTMLInputElement>;
  referenceFemale: React.RefObject<HTMLInputElement>;
  genderError: string;
}
export interface InputCompProps {
  inputName: keyof UserCustomFormInterface;
  type: string;
  errors: FieldError | undefined;
  register: UseFormRegister<UserCustomFormInterface>;
}
export interface InputRadioProps {
  inputName: keyof UserCustomFormInterface;
  errors: FieldError | undefined;
  register: UseFormRegister<UserCustomFormInterface>;
}
