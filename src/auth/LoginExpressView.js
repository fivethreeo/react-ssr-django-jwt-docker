import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
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

  const mutationresult = await executeMutation(client, LoginMutation, state['values'])
  console.log(mutationresult)
  if (mutationresult.error && mutationresult.error.graphQLErrors) {
    state['formerror'] = mutationresult.error.graphQLErrors[0].message;
    state['values']['password'] = '';
    res.locals.serverContextValue = state;
    console.log(state)
    return next();
  }
  else if (mutationresult.data && mutationresult.data.tokenAuth && mutationresult.data.tokenAuth.token) {
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
    next();
  }

})