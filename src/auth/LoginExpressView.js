import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';


export default SSRCallback( async (req, res, next, cache, client) => {
  
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
    cache.set('login', state, [])
    return next();
  }

  const mutationresult = await executeMutation(client, LoginMutation, state['values'])
  if (mutationresult.data && mutationresult.data.tokenAuth.token) {
    req.universalCookies.set('authToken',
      mutationresult.data.tokenAuth.token, {
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
    state['errors'] = fromGqlErrors(mutationresult.data.errors);
    state['values']['password'] = '';
    cache.set('login', state, [])
    return next();
  }

})