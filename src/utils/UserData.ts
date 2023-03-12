import { UserInterface } from '../types/interfaces';

export default class UserData {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    eyeColor: string;
    height: number;
    birthday: string;
    hairColor: string;
    hairType: string;
    city: string;
    image: string;

    constructor(rawData: UserInterface) {
        this.id = rawData.id;
        this.firstName = rawData.firstName;
        this.lastName = rawData.lastName;
        this.age = rawData.age;
        this.gender = rawData.gender;
        this.eyeColor = rawData.eyeColor;
        this.height = rawData.height;
        const bd = rawData.birthDate.split('-');
        this.birthday = bd[2] + ' / ' + bd[1];
        this.hairColor = rawData.hair.color;
        this.hairType = rawData.hair.type;
        this.city = rawData.address.city;
        this.image = rawData.image;
    }
}