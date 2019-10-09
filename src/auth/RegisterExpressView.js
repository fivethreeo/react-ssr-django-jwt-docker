import { SSRCallback, executeMutation, fromYupErrors, fromGqlErrors } from '../utils/SSRUtils';
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

  const mutationresult = await executeMutation(client, RegisterMutation, state['values']);
  if (mutationresult.error && mutationresult.error.graphQLErrors) {
    state['formerror'] = mutationresult.error.graphQLErrors[0].message;
    state['values']['password'] = '';
    state['values']['passwordRepeat'] = '';
    res.locals.serverContextValue = state;
    return next();
  }
  if (mutationresult.data && mutationresult.data.register.success) {
    res.redirect('/login');
  }
  else {
    return next();
  }

})
