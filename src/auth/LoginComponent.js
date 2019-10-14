import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Context  } from 'urql';

import { TextField } from '../components/BlueprintForm';
import useServerContext from '../hooks/useServerContext';
import { executeMutation } from '../common/utils/urql';
import { fromGqlErrors } from '../common/utils/errors';

import { withCookies } from '../common/CookieContext';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';

const Login = ({ history, cookies, onLoginSuccess = null, error = '' }) => {
  const client = useContext(Context);
  const [login] = useServerContext({
    values: {
      email: '',
      password: ''
    },
    errors: {},
    formerror: ''
  });
  return (
    <>
      { error }
      <Formik
        initialValues={login.values}
        initialErrors={login.errors}
        validationSchema={LoginSchema}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          executeMutation(client, LoginMutation, values)
          .then((res)=>{
            if (res.data && res.data.tokenAuth.token) {
              cookies.set('authToken', res.data.tokenAuth.token, {
                path: '/',
                expires: new Date(new Date().getTime()+1000*60*60*24),
                maxAge: 60*60*24,
                domain: config('COOKIE_HOST'),
                secure: config('COOKIE_SECURE'),
                httpOnly: false,
                sameSite: true
              });
              if (onLoginSuccess) onLoginSuccess();
              else history.push('/');
            }
            else if (res.errors) {
              actions.setErrors(fromGqlErrors(res.errors));
              actions.setSubmitting(false);
            }
          });
        }}
        render={(props) => (
          <form action="/login"
            method="POST"
            className="needs-validation form-auth form-register"
            onSubmit={props.handleSubmit}
            noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
            { login.formerror && <p>{login.formerror}</p> }
            <TextField name="email" type="text"
              label="Email address" placeholder="your@email.com" />
            <TextField name="password" type="password"
              label="Password" placeholder="Password" />
            <p>
              <button className="btn btn-lg btn-primary btn-block"
                type="submit">Login</button></p>
            <p>Don't have an account? 
              <Link to='/register'>Create one now</Link> or <Link to='/social/github'>Log in using github</Link></p>

          </form>

        )}
      />
    </>
  );
};

export default withRouter(withCookies(Login));