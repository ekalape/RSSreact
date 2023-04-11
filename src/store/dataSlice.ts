import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../types/interfaces';


export type StateUsersType = {
    searchWord: string,
    users: UserInterface[],
    filteredUsers: UserInterface[],
    customUsers: UserInterface[]
}

const initialState: StateUsersType = {
    searchWord: "",
    users: [],
    filteredUsers: [],
    customUsers: []
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
            state.customUsers.push(action.payload.customUser)
        },
        loadCustomCardsRdc: (state, action) => {
            state.customUsers = action.payload.customUsers
        },
    }

})

export const { addSearchWordRdc, loadDataRdc, filterUsersRdc, addCustomUserRdc, loadCustomCardsRdc } = dataSlice.actions;
export default dataSlice.reducer;