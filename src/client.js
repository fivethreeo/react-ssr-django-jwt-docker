import React from 'react';
import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Load all components needed before rendering
loadableReady(() => {
  const root = document.getElementById('root')
  hydrate(
  	<BrowserRouter>
  	  <App />
  	</BrowserRouter>,
  	root)
})

if (module.hot) {
  module.hot.accept();
}
