import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';

import { setupStore } from './store/index';

const store = setupStore(window.__PRELOADED_STATE__);
delete window.__PRELOADED_STATE__;

hydrateRoot(
  document.getElementById('root') as HTMLDivElement,
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
