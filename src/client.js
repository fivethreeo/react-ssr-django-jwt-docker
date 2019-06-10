import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Cookies from 'universal-cookie';
import { ApolloProvider } from "react-apollo-hooks";
import { getApolloClient } from './apolloUtils';
import CookieProvider from './Cookies';
import App from './App';

const cookies = new Cookies();

const history = createBrowserHistory();

const client = getApolloClient({ history, cookies });

// Load all components needed before rendering
loadableReady(() => {
  const root = document.getElementById('root')
  const renderMethod = !!module.hot ? render : hydrate;
  renderMethod(
    <CookieProvider value={cookies}>
      <ApolloProvider client={client}>
        <BrowserRouter history={history} >
          <App />
        </BrowserRouter>
      </ApolloProvider>
    </CookieProvider>,
    root)
})

if (module.hot) {
  module.hot.accept();
}
