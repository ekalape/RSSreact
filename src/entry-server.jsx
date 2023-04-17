import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';

import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

export function render(url, context) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url} context={context}>
      <Provider store={store}>
        <App />
      </Provider>
    </StaticRouter>
  );
}
