import { UserCustomInterface, UserInterface } from '../types/interfaces';

export default class UserData {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  eyeColor: string;
  birthday: string;
  hairColor: string;
  hairType: string;
  city: string;
  image: string | File | undefined;

  constructor(rawData: UserCustomInterface | UserInterface) {
    this.id = rawData.id;
    this.firstName = rawData.firstName;
    this.lastName = rawData.lastName;
    this.age = rawData.age;
    this.gender = rawData.gender;
    this.eyeColor = rawData.eyeColor;
    const bd = rawData.birthDate.split('-');
    this.birthday = bd[2] + '/' + bd[1];
    this.hairColor = rawData.hair.color;
    this.hairType = rawData.hair.type;
    if ('city' in rawData) this.city = rawData.city;
    else this.city = rawData.address.city;
    if ('image' in rawData) this.image = rawData.image;
    else this.image = rawData.imageFile;
  }
}
