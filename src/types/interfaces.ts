import { FieldError, UseFormRegister } from 'react-hook-form';
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
  gender: 'male' | 'female';
  eyeColor: string;
  image: string;
  hairColor: string;
  animal: string;
  birthDate: string;
  city: string;
}
export type UserCustomInterface = {
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

export interface FormProps {
  cardNumber: number;
  callback: (user: UserData) => void;
}

export interface FormWrapperState {
  cards: UserData[];
  showMessage: boolean;
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
export interface SelectProps {
  selectName: keyof UserCustomFormInterface;
  register: UseFormRegister<UserCustomFormInterface>;
  selectOptions: string[];
  selectError: FieldError | undefined;
}
