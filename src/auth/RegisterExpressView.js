import { fromYupErrors, fromGqlErrors } from '../common/utils/errors';
import { SSRCallback } from '../server/utils/ssr';
import { executeMutation } from '../common/utils/urql';
import { RegisterSchema, RegisterMutation } from './RegisterCommon';


export default SSRCallback( async (req, res, next, client) => {
  
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
    res.locals.serverContextValue = state;
    return next();
  }

  const result = await executeMutation(client, RegisterMutation, state['values']);
  if (result.error && result.error.graphQLErrors) {
    state['formerror'] = result.error.graphQLErrors[0].message;
    state['values']['password'] = '';
    state['values']['passwordRepeat'] = '';
    res.locals.serverContextValue = state;
    return next();
  }
  if (result.data && result.data.register.success) {
    res.redirect('/login');
  }
  else {
    return next();
  }

})
