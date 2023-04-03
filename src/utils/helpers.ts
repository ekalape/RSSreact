import { API_ADDRESS } from './index';

/* eslint-disable prettier/prettier */


export function transformSearchWords(words: string[]) {
    const filterKeys = ["firstName", "lastName", "age", "gender", "eyeColor", "eye", "eyes", "hair", "address", "birthDate"]
    if (filterKeys.includes(words[0])) return words[0] === "eye" || words[0] === "eyes" ? `/filter?key=eyeColor&value=${words[1]}` :
        words[0] === "hair" ? `/filter?key=hair.color&value=${words[1]}/filter?key=hair.type&value=${words[1]}` :
            `/filter?key=${words[0]}&value=${words[1]}`
    else return "";
}

export function filterWords() {

}