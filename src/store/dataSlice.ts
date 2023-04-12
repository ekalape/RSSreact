import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../types/interfaces';


export type StateUsersType = {
    searchWord: string,
    customUsers: UserInterface[]
}

const initialState: StateUsersType = {
    searchWord: "",
    customUsers: []
};

const dataSlice = createSlice({
    name: "mainData",
    initialState,
    reducers: {
        addSearchWordRdc: (state, action) => {
            state.searchWord = action.payload.word;
        },
        addCustomUserRdc: (state, action) => {
            state.customUsers.push(action.payload.customUser)
        },
        loadCustomCardsRdc: (state, action) => {
            state.customUsers = action.payload.customUsers
        },
    }

})

export const { addSearchWordRdc, addCustomUserRdc, loadCustomCardsRdc } = dataSlice.actions;
export default dataSlice.reducer;