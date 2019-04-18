import React from 'react';
import { hydrate, render } from 'react-dom';
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom';
import Cookies from 'universal-cookie';
import CookieProvider from './Cookies';
import AxiosProvider from './Axios';
import App from './App';

const cookies = new Cookies();

// Load all components needed before rendering
loadableReady(() => {
  const root = document.getElementById('root')
  const renderMethod = !!module.hot ? render : hydrate;
  renderMethod(
    <CookieProvider value={cookies}>
      <AxiosProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AxiosProvider>
    </CookieProvider>,
    root)
})

if (module.hot) {
  module.hot.accept();
}
