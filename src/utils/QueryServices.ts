

import { UserInterface } from '../types/interfaces';

import * as rtkQuery from '@reduxjs/toolkit/dist/query/index.js';
import * as rtkQueryReact from '@reduxjs/toolkit/dist/query/react/index.js';

type RtkQueryType = typeof rtkQuery & { default?: unknown };
type RtkQueryReactType = typeof rtkQueryReact & { default?: unknown };

const { buildCreateApi, coreModule, fetchBaseQuery } = ((rtkQuery as RtkQueryType).default ?? rtkQuery) as typeof rtkQuery;
const { reactHooksModule } = ((rtkQueryReact as RtkQueryReactType).default ?? rtkQueryReact) as typeof rtkQueryReact;


const createCustomApi = buildCreateApi(
  coreModule(),
  reactHooksModule({ unstable__sideEffectsInRender: true })
)

export const usersGeneralQuery = createCustomApi({
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
