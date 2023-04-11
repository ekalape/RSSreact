import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from '../types/interfaces';
import UserData from '../utils/UserData';


export type StateUsersType = {
    searchWord: string,
    users: UserInterface[],
    filteredUsers: UserInterface[]
}

const initialState: StateUsersType = {
    searchWord: "",
    users: [],
    filteredUsers: []
};

const dataSlice = createSlice({
    name: "mainData",
    initialState,
    reducers: {
        loadDataRdc: (state, action) => {
            state.users = action.payload.users
        },
        filterUsersRdc: (state, action) => {
            //toDo
        },
        addUserRdc: (state, action) => {
            state.users.push(action.payload.user)
        }
    }

})

export const { loadDataRdc, filterUsersRdc, addUserRdc } = dataSlice.actions;
export default dataSlice.reducer;