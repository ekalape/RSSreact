export interface SearchWordInterface {
    searchWord: string
}
export interface UserHairProp {
    color: string, type: string
}
export interface UserAddressProp {
    address: string,
    city: string,
    coordinates: { lat: number, lng: number },
    postalCode: string,
    state: string
}

export interface UserInterface {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    gender: "male" | "female",
    height: number,
    eyeColor: string,
    image: string,
    hair: UserHairProp,
    birthDate: string,
    address: Pick<UserAddressProp, "city">
}


export interface SearchProps {
    callback: (searchWord: string) => void,
    actualSearchWord: string
}