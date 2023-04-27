import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToPipeableStream, RenderToPipeableStreamOptions } from 'react-dom/server';
import { setupStore } from './store';
import { Provider } from 'react-redux';

import App from './App';
import { usersGeneralQuery } from './utils/QueryServices';
const store = setupStore();

export async function render(url: string, options: RenderToPipeableStreamOptions) {
  store.dispatch(usersGeneralQuery.endpoints.getAllUsers.initiate({ word: '' }));
  await Promise.all(store.dispatch(usersGeneralQuery.util.getRunningQueriesThunk()));

  const stream = renderToPipeableStream(
    <html>
      <Provider store={store}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </Provider>
    </html>,
    options
  );
  return [stream, store.getState()];
}
