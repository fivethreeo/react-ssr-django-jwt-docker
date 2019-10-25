import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';

import {
  Client,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  Provider as UrqlProvider
} from 'urql';

import CookieContext from './common/CookieContext';
import ServerStateContext from './common/ServerStateContext';

import App from './components/App';
import config from './config';

const cookies = new Cookies();

const history = createBrowserHistory();

const uqlSSRCache = ssrExchange({
  initialState: window.URQL_DATA
});

const client = new Client({
  fetchOptions: () => {
    const token = cookies.get('authToken');
    if (token) {
      return {
        headers: {
          Authorization: `JWT ${token}`
        }
      };
    }
    return {};
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    // Put the exchange returned by calling ssrExchange after your
    // cacheExchange, but before any asynchronous exchanges like
    // the fetchExchange:
    uqlSSRCache,
    fetchExchange,
  ],
  url: config('GRAPHQL_URL'),
  suspense: false
});

const appRender = Component => {
  const root = document.getElementById('root');
  const renderMethod = !!module.hot ? render : hydrate;
  renderMethod(
    <ServerStateContext.Provider value={window.__SERVER_STATE_CONTEXT__}>
      <UrqlProvider value={client}>
        <CookieContext.Provider value={cookies}>
          <Router history={history} >
            <Component />
          </Router>
        </CookieContext.Provider>
      </UrqlProvider>
    </ServerStateContext.Provider>,
    root);
}

// Load all components needed before rendering
loadableReady(() => {
  appRender(App);
});

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    appRender(NextApp);
  });
}
