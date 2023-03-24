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
  city: string;
  imageFile: File | undefined;
};
export interface SearchProps {
  callback: (searchWord: string) => void;
}
export interface FormState {
  [key: string]: string;
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
export interface InputComponentProps {
  name: string;
  type: string;
  error: string;
  reference: React.RefObject<HTMLInputElement>;
  options?: {
    [key: string]: string;
  };
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
