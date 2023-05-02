import { rest } from 'msw';
import fakeUsers from './fakeUsers';

export const handlers = [
  rest.get('https://642a6aa000dfa3b547453ae9.mockapi.io/api/users/', (req, res, ctx) => {
    const searchWord = req.url.searchParams.get('search');
    return res(
      ctx.status(200),
      ctx.json(
        fakeUsers.filter((u) =>
          Object.values(u).some((val) => {
            return val.toString().toLowerCase() === searchWord?.toString().toLowerCase();
          })
        )
      )
    );
  }),
];
