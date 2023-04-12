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
                params: {

                }

            })
        })
    })
})
export const { useGetAllUsersQuery, useGetSingleUserQuery } = usersGeneralQuery