
import { UserInterface } from '../types/interfaces';
import * as toolkitRaw from '@reduxjs/toolkit';

type ToolkitRawType = typeof toolkitRaw & { default?: unknown }
const { createSlice } = ((toolkitRaw as ToolkitRawType).default ?? toolkitRaw) as typeof toolkitRaw;

export type StateUsersType = {
  searchWord: string;
  customUsers: UserInterface[];

};

const initialState: StateUsersType = {
  searchWord: '',
  customUsers: []

};

const dataSlice = createSlice({
  name: 'mainData',
  initialState,

  reducers: {
    addSearchWordRdc: (state: StateUsersType, action: { payload: { word: string } }) => {
      state.searchWord = action.payload.word;
    },
    addCustomUserRdc: (state: StateUsersType, action: { payload: { customUser: UserInterface } }) => {
      state.customUsers.push(action.payload.customUser);
    },

  },
});

export const { addSearchWordRdc, addCustomUserRdc } = dataSlice.actions;
export default dataSlice.reducer;
