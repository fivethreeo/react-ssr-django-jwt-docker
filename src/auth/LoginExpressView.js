import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';


export default SSRCallback( async (req, res, next, cache, client) => {

  if (req.method != "POST") next();

  const state = {
    values: LoginSchema.cast(req.body),
    errors: {}
  };

  LoginSchema.validate(state['values'], {abortEarly: false})
  .then((values) => {
    
    executeMutation(client, LoginMutation, values)
    .then((mres)=>{

      if (mres.data && mres.data.login.success) {
        res.locals.UniversalCookies.set('authToken', mres.data.login.token, {
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
        state['errors'] = fromGqlErrors(mres.data.login.errors);
        state['values']['password'] = '';
        cache.set('login', state, [])
        next();
      }

    })

  }).catch((err) => {
    state['values']['password'] = '';    
    state['errors'] = fromYupErrors(err);
    cache.set('login', state, [])

    next();

  });
       
 }
)