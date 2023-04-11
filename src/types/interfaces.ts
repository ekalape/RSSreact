import { FieldError, UseFormRegister } from 'react-hook-form';
import UserData from '../utils/UserData';

export type EmptyProps = {
  children?: React.ReactNode;
};

export interface SearchWordInterface {
  searchWord: string;
}
export interface UsersecondProp {
  color: string;
  type: string;
}
export interface UserAddressProp {
  address: string;
  country: string;
  coordinates: { lat: number; lng: number };
  postalCode: string;
  state: string;
}

export interface UserInterface {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  firstColor: string;
  image: string;
  secondColor: string;
  animal: string;
  birthDate: string;
  country: string;
}
export type UserCustomInterface = {
  id: number;
  firstName: string;
  lastName: string;
  gender: 'male' | 'female';
  firstColor: string;
  secondColor: string;
  animal: string;
  birthDate: string;
  country: string;
  imageFile: File | string | undefined;
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
