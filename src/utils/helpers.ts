import { API_ADDRESS } from './index';

/* eslint-disable prettier/prettier */


export function transformSearchWords(words: string[]) {
    const filterKeys = ["firstName", "lastName", "age", "gender", "firstColor", "first", "first", "second", "address", "birthDate"]
    if (filterKeys.includes(words[0])) return words[0] === "first" || words[0] === "first" ? `/filter?key=firstColor&value=${words[1]}` :
        words[0] === "second" ? `/filter?key=second.color&value=${words[1]}/filter?key=second.type&value=${words[1]}` :
            `/filter?key=${words[0]}&value=${words[1]}`
    else return "";
}

export function filterWords() {

}