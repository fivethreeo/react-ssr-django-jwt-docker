import { executeMutation } from '../common/utils/urql';
import { SocialAuthMutation, SocialAuthCompleteMutation } from './SocialAuthCommon';
import serialize from 'serialize-javascript';

import config from '../config';

import getUrqlProps from '../server/utils/urql';
import renderApp from '../server/renderApp';

export const SocialAuthExpressView = async (req, res) => {
  const urqlProps = getUrqlProps(req, res);
  const { urqlClient } = urqlProps;

  const result = await executeMutation(urqlClient, SocialAuthMutation, {
    provider: req.params.provider,
    redirectUri: config('APP_URL') + '/social/' + req.params.provider + '/complete'
  });

  if (result.error && result.error.graphQLErrors) {
      console.error(result.error)
    renderApp({
      req, res,
      severState: {
        error: result.error.graphQLErrors[0].message
      },
      ...urqlProps
    });
  }
  else if (result.data && result.data.socialAuth) {
    if (result.data.socialAuth.result.__typename === 'Redirect') {
      res.redirect(302, result.data.socialAuth.result.url);
    }
  }
  else {
    renderApp({ req, res, ...urqlProps });
  }

};

export const SocialAuthCompleteExpressView = async (req, res) => {
  const urqlProps = getUrqlProps(req, res);
  const { urqlClient } = urqlProps;

  const requestData = serialize(req.query);

  const result = await executeMutation(urqlClient, SocialAuthCompleteMutation, {
    provider: req.params.provider,
    requestData: requestData,
    redirectUri: config('APP_URL') + '/social/' + req.params.provider + '/complete'
  });

  if (result.error && result.error.graphQLErrors) {
      console.error(result.error.graphQLErrors)
    renderApp({
      req, res,
      severState: {
        error: result.error.graphQLErrors[0].message
      },
      ...urqlProps
    });
  }
  else if (result.data && result.data.socialAuthComplete) {
    if (result.data.socialAuthComplete.result.__typename === 'Redirect') {
      res.redirect(302, result.data.socialAuthComplete.result.url);
    }
    if (result.data.socialAuthComplete.result.__typename === 'JWT') {
      req.universalCookies.set('authToken', result.data.socialAuthComplete.result.token, {
        path: '/',
        expires: new Date(new Date().getTime()+1000*60*60*24),
        maxAge: 60*60*24,
        domain: config('COOKIE_HOST'),
        secure: config('COOKIE_SECURE'),
        httpOnly: false,
        sameSite: 'lax'
      })
      res.redirect(302, '/');
    }
  }
  else {
    renderApp({ req, res, ...urqlProps });
  }

};
