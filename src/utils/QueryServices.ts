import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserInterface } from '../types/interfaces';

export const usersGeneralQuery = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://642a6aa000dfa3b547453ae9.mockapi.io/api/users' }),
  endpoints: (build) => ({
    getAllUsers: build.query<UserInterface[], { word: string; limit?: number; page?: number }>({
      query: (args) => ({
        url: '/',
        params: {
          search: args.word,
          limit: args.limit || '',
          page: args.page || '',
        },
      }),
    }),
    getSingleUser: build.query<UserInterface, number>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
  }),
});
export const { useGetAllUsersQuery, useLazyGetSingleUserQuery } = usersGeneralQuery;
