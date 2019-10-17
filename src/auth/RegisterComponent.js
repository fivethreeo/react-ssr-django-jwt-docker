import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Formik } from 'formik';
import { Context  } from 'urql';

import { Callout } from '@blueprintjs/core';
import { TextField } from '../components/BlueprintForm';
import useServerState from '../hooks/useServerState';
import { executeMutation } from '../common/utils/urql';
import { fromGqlErrors } from '../common/utils/errors';

import { RegisterSchema, RegisterMutation } from './RegisterCommon';

const Register = ({ history }) => {
  const client = useContext(Context);

  const [ values, hasServerValues ] = useServerState(
    { email: '',  password: '',  passwordRepeat: '' }, 'values');

  const [ errors, hasServerErrors ] = useServerState({}, 'errors');

  const [ formError, hasFormError ] = useServerState(false, 'formerror');

  const touched = hasServerErrors ?
    Object.keys(errors)
    .reduce(function(result, item) {
    result[item] = true;
    return result;
  }, {}) : {};

  return (
    <>
      <Formik
        initialValues={values}
        initialErrors={errors}
        initialTouched={touched}
        initialState={formError}
        validationSchema={RegisterSchema}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          executeMutation(client, RegisterMutation, values)
            .then((res)=>{
              if (res.data && res.data.register.success) {
                history.push('/login');
              }
              else if (res.data) {
                actions.setErrors(
                  fromGqlErrors(res.data.register.errors));
              }
              actions.setSubmitting(false);
            });
        }}
        render={({ handleSubmit, status }) => (
          <form method="POST"
            className="needs-validation form-auth form-register"
            onSubmit={handleSubmit}
            noValidate>
            <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            { status && <Callout intent="danger">{status}</Callout> }
            <TextField name="email" type="text"
              label="Email address" placeholder="your@email.com" />
            <TextField name="password" type="password"
              label="Password" placeholder="Password" />
            <TextField name="passwordRepeat" type="password"
              label="Password (again)" placeholder="Password (again)" />
            <button className="btn btn-lg btn-primary btn-block"
              type="submit">Register</button>
          </form>
        )}
      />
    </>
  );
};

export default withRouter(Register);