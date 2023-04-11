import { UserInterface } from '../types/interfaces';

export default class UserData {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  firstColor: string;
  birthday: string;
  secondColor: string;
  animal: string;
  country: string;
  image: string;
  age: number;

  constructor(rawData: UserInterface) {
    this.id = rawData.id;
    this.firstName = rawData.firstName;
    this.lastName = rawData.lastName;
    this.gender = rawData.gender;

    if (rawData.firstColor.includes(' ')) {
      const ind = rawData.firstColor.lastIndexOf(' ');
      this.firstColor = rawData.firstColor.slice(ind + 1);
    } else this.firstColor = rawData.firstColor;
    if (rawData.secondColor.includes(' ')) {
      const ind = rawData.secondColor.lastIndexOf(' ');
      this.secondColor = rawData.secondColor.slice(ind + 1);
    } else this.secondColor = rawData.secondColor;
    const bd = rawData.birthDate.slice(0, 10).split('-');
    this.birthday = bd[2] + '/' + bd[1];
    this.age = new Date().getFullYear() - +bd[0];

    this.animal = rawData.animal;
    this.country = rawData.country;
    this.image = rawData.image;
  }
}
