import { fromYupErrors, fromGqlErrors } from '../common/utils/errors';
import { SSRCallback } from '../server/utils/ssr';
import { executeMutation } from '../common/utils/urql';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';


export default SSRCallback( async (req, res, next, client) => {
  
  if (req.method != "POST") return next();

  const state = {
    values: LoginSchema.cast(req.body),
    errors: {}
  };

  try {
    state['values'] = LoginSchema.validateSync(state['values'], {abortEarly: false})
  }
  catch(err) {
    state['values']['password'] = '';    
    state['errors'] = fromYupErrors(err);
    res.locals.serverContextValue = state;
    return next();
  }

  const result = await executeMutation(client, LoginMutation, state['values'])
  if (result.error && result.error.graphQLErrors) {
    state['formerror'] = result.error.graphQLErrors[0].message;
    state['values']['password'] = '';
    res.locals.serverContextValue = state;
    return next();
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
    res.redirect('/');
  }
  else {
    return next();
  }

})