import express from 'express';
import bodyParser from 'body-parser';
import cookiesMiddleware from 'universal-cookie-express';
import queryString from 'query-string';
import security from './middleware/security';

import ActivateExpressView from '../auth/ActivateExpressView';
import RegisterExpressView from '../auth/RegisterExpressView';
import LoginExpressView from '../auth/LoginExpressView';
import {
  SocialAuthExpressView,
  SocialAuthCompleteExpressView
} from '../auth/SocialAuthExpressViews';

import renderApp from './renderApp';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();

server
  .disable('x-powered-by')
  .use(...security)
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .use(cookiesMiddleware())
  .use('/static', express.static(process.env.RAZZLE_PUBLIC_DIR))
  
  .use('/register', RegisterExpressView)
  .use('/activate', ActivateExpressView)
  .use('/login', LoginExpressView)
  .use('/social/:provider/complete', SocialAuthCompleteExpressView)
  .use('/social/:provider', SocialAuthExpressView)

  .use((req, res) => {
    console.log('index')
    renderApp({req, res})
  });

export default server;
