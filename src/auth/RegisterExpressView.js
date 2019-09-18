import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
import { RegisterSchema, RegisterMutation } from './RegisterCommon';


export default SSRCallback( async (req, res, next, cache, client) => {
  
  if (req.method != "POST") return next();

  const state = {
    values: RegisterSchema.cast(req.body),
    errors: {}
  };

  try {
    state['values'] = RegisterSchema.validateSync(state['values'], {abortEarly: false});
  }
  catch(err) {
    state['values']['password'] = '';
    state['values']['passwordRepeat'] = '';
    state['errors'] = fromYupErrors(err);
    cache.set('registration', state, []);
    return next();
  }

  const mutationresult = await executeMutation(client, RegisterMutation, state['values']);
  if (mutationresult.data && mutationresult.data.register.success) {
    res.redirect('/login');
  }
  else {
    state['errors'] = fromGqlErrors(mutationresult.data.register.errors);
    state['values']['password'] = '';
    state['values']['passwordRepeat'] = '';
    cache.set('registration', state, []);
    return next();
  }

})
