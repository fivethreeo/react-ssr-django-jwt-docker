import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Cookies from 'universal-cookie';
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { getApolloClient } from './utils/apolloUtils';
import CookieContext from './utils/CookieContext';
import App from './components/App';

const cookies = new Cookies();

const history = createBrowserHistory();

const client = getApolloClient({ history, cookies });

// Load all components needed before rendering
loadableReady(() => {
  const root = document.getElementById('root')
  const renderMethod = !!module.hot ? render : hydrate;
  renderMethod(
    <CookieContext.Provider value={cookies}>
      <ApolloProvider client={client}>
        <ApolloHooksProvider client={client} >
          <BrowserRouter history={history} >
            <App />
          </BrowserRouter>
        </ApolloHooksProvider>
      </ApolloProvider>
    </CookieContext.Provider>,
    root)
})

if (module.hot) {
  module.hot.accept();
}
