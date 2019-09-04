import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component'
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


import CookieContext from './utils/CookieContext';
import { createSSRCache } from './utils/SSRCache';

import App from './components/App';
import config from './config';

const cookies = new Cookies();

const history = createBrowserHistory();

const SSRCache = createSSRCache();

const uqlSSRCache = ssrExchange({
  initialState: window.URQL_DATA
});

const client = new Client({
  fetchOptions: () => {
    const token = cookies.get('token');
    console.log(token);
    if (token) {
      return {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };
    }
    return {};
  },
  exchanges: [
    dedupExchange,
    cacheExchange,
    // Put the exchange returned by calling ssrExchange after your cacheExchange,
    // but before any asynchronous exchanges like the fetchExchange:
    uqlSSRCache,
    fetchExchange,
  ],
  url: config('GRAPHQL_URL'),
  suspense: false
});

// Load all components needed before rendering
loadableReady(() => {
  const root = document.getElementById('root')
  const renderMethod = !!module.hot ? render : hydrate;
  renderMethod(
    <SSRCache.Provider>
      <UrqlProvider value={client}>
        <CookieContext.Provider value={cookies}>
          <Router history={history} >
            <App />
          </Router>
        </CookieContext.Provider>
      </UrqlProvider>
    </SSRCache.Provider>,
    root)
})

if (module.hot) {
  module.hot.accept();
}
