import { fromYupErrors, fromGqlErrors } from '../common/utils/errors';
import { executeMutation } from '../common/utils/urql';
import { RegisterSchema, RegisterMutation } from './RegisterCommon';

import getUrqlProps from '../server/utils/urql';
import renderApp from '../server/renderApp';

export default async (req, res) => {

  const urqlProps = getUrqlProps(req, res);
  const { urqlClient } = urqlProps;

  if (req.method !== "POST") renderApp({ req, res, ...urqlProps });

  const castedValues = RegisterSchema.cast(req.body);

  try {
    RegisterSchema.validateSync(castedValues, {abortEarly: false});
  }
  catch(err) {
    const { password = '', passwordRepeat = '', ...stripPassword } = castedValues;
    const serverState = {
      values: {
        password: '',
        passwordRepeat: '',
        ...stripPassword
      },
      errors: fromYupErrors(err)
    };
    renderApp({ req, res, serverState, ...urqlProps });
  }

  const result = await executeMutation(urqlClient, RegisterMutation, castedValues);
  if (result.error && result.error.graphQLErrors) {
    const { password = '', passwordRepeat = '', ...stripPassword } = castedValues;
    const serverState = {
      values: {
        password: '',
        passwordRepeat: '',
        ...stripPassword
      },
      formError: result.error.graphQLErrors[0].message
    };
    renderApp({ req, res, serverState, ...urqlProps });
  }
  if (result.data && result.data.register.success) {
    res.redirect('/login');
  }
  else {
    renderApp({ req, res, ...urqlProps});
  }

};
