import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../types/interfaces';
import UserData from '../utils/UserData';


export type StateUsersType = {
    searchWord: string,
    users: UserInterface[],
    filteredUsers: UserInterface[],
    customCards: UserInterface[]
}

const initialState: StateUsersType = {
    searchWord: "",
    users: [],
    filteredUsers: [],
    customCards: []
};

const dataSlice = createSlice({
    name: "mainData",
    initialState,
    reducers: {
        addSearchWordRdc: (state, action) => {
            state.searchWord = action.payload.word;
        },
        loadDataRdc: (state, action) => {
            state.users = action.payload.users
        },
        filterUsersRdc: (state, action) => {
            //toDo
        },
        addCustomUserRdc: (state, action) => {
            state.users.push(action.payload.user)
        },
        loadCustomCardsRdc: (state, action) => {
            state.customCards = action.payload.customCards
        },
    }

})

export const { addSearchWordRdc, loadDataRdc, filterUsersRdc, addCustomUserRdc, loadCustomCardsRdc } = dataSlice.actions;
export default dataSlice.reducer;