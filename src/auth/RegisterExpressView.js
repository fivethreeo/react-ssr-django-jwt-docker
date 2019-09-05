import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
import { RegisterSchema, RegisterMutation } from './RegisterCommon';


export default SSRCallback( async (req, res, next, cache, client) => {
  
  if (req.method != "POST") next();

  const state = {
    values: RegisterSchema.cast(req.body),
    errors: {}
  };

  RegisterSchema.validate(state['values'], {abortEarly: false})
  .then((values) => {
    
    executeMutation(client, RegisterMutation, values)
    .then((mres)=>{

      if (mres.data && mres.data.register.success) {
        res.redirect('/login');
      }
      else {
        state['errors'] = fromGqlErrors(mres.data.register.errors);
        state['values']['password'] = '';
        state['values']['passwordRepeat'] = '';
        cache.set('registration', state, [])
        next();
      }

    })

  }).catch((err) => {
    state['values']['password'] = '';    
    state['values']['passwordRepeat'] = '';
    state['errors'] = fromYupErrors(err);
    cache.set('registration', state, [])

    next();

  });
       
 }
)
