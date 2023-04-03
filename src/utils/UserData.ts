import { UserCustomInterface, UserInterface } from '../types/interfaces';

export default class UserData {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  eyeColor: string;
  birthday: string;
  hairColor: string;
  animal: string;
  city: string;
  image: string | File | undefined;
  age: number;

  constructor(rawData: UserCustomInterface | UserInterface) {
    this.id = rawData.id;
    this.firstName = rawData.firstName;
    this.lastName = rawData.lastName;
    this.gender = rawData.gender;
    this.eyeColor = rawData.eyeColor;
    console.log(typeof rawData.birthDate);

    const bd = rawData.birthDate.slice(0, 10).split('-');
    this.birthday = bd[2] + '/' + bd[1];
    this.age = new Date().getFullYear() - +bd[0];

    this.hairColor = rawData.hairColor;
    this.animal = rawData.animal;
    this.city = rawData.city;
    if ('image' in rawData) this.image = rawData.image;
    else this.image = rawData.imageFile;
  }
}
