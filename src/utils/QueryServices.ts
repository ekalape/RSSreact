import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserInterface } from '../types/interfaces'


export const usersGeneralQuery = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://642a6aa000dfa3b547453ae9.mockapi.io/api/users' }),
    endpoints: (build) => ({
        getAllUsers: build.query<UserInterface[], { limit: number, page: number }>({
            query: (args) => ({
                url: '/',
                params: {
                    limit: args.limit,
                    page: args.page
                }

            })
        }),
        getSingleUser: build.query<UserInterface, number>({
            query: (id) => ({
                url: `/${id}`,
            })
        }),
        /*  filterUsers: build.query<UserInterface[], string>({
             query: (searchWord) => ({
                 url: `?search=${searchWord.trim()}`,            
             })
         }) */
    })
})
export const { useGetAllUsersQuery, useLazyGetSingleUserQuery } = usersGeneralQuery