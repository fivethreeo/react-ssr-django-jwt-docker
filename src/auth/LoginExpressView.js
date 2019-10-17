import { fromYupErrors, fromGqlErrors } from '../common/utils/errors';
import { executeMutation } from '../common/utils/urql';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';


import getUrqlProps from '../server/utils/urql';
import renderApp from '../server/renderApp';

export default async (req, res) => {
  
  const urqlProps = getUrqlProps(req, res);
  const { urqlClient } = urqlProps;

  if (req.method !== "POST") return renderApp({ req, res, ...urqlProps });

  let castedValues = LoginSchema.cast(req.body);
  try {
    castedValues = LoginSchema.validateSync(castedValues, {abortEarly: false})
  }
  catch(err) {
    const { password = '', ...stripPassword } = castedValues;
    const serverState = {
      values: { password: '', ...stripPassword },
      errors: fromYupErrors(err)
    };
    return renderApp({ req, res, serverState, ...urqlProps });
  }

  const result = await executeMutation(urqlClient, LoginMutation, castedValues)
  if (result.error && result.error.graphQLErrors) {
    const { password = '', ...stripPassword } = castedValues;
    const serverState = {
      values: { password: '', ...stripPassword },
      formError: result.error.graphQLErrors[0].message
    };
    return renderApp({ req, res, serverState, ...urqlProps });
  }
  else if (result.data && result.data.tokenAuth && result.data.tokenAuth.token) {
    req.universalCookies.set('authToken',
      result.data.tokenAuth.token, {
      path: '/',
      expires: new Date(new Date().getTime()+1000*60*60*24),
      maxAge: 60*60*24,
      domain: config('COOKIE_HOST'),
      secure: config('COOKIE_SECURE'),
      httpOnly: false,
      sameSite: true
    });
    return res.redirect('/');
  }
  else {
    return renderApp({ req, res, ...urqlProps });
  }

};