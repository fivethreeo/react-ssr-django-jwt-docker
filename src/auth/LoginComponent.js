import React, { useContext } from "react";
import { withRouter, Link } from 'react-router-dom'
import { Formik } from 'formik';
import { Context  } from "urql";

import { TextInput } from '../utils/FormUtils';
import { useSSRState } from '../hooks/useSSRState';
import { executeMutation, fromGqlErrors } from '../utils/SSRUtils';

import { withCookies } from '../utils/CookieContext';
import { LoginSchema, LoginMutation } from './LoginCommon';
import config from '../config';

const Login = ({ history, cookies }) => {
  const client = useContext(Context);
  const [login, hasSSRState, setLogin] = useSSRState(
    {values: { email: '', password: '' }, errors: {} }, 'login', []);
  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <Formik
        initialValues={login.values}
        initialErrors={login.errors}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          executeMutation(client, LoginMutation, values)
          .then((res)=>{
            if (res.data && res.data.login.success) {
              cookies.set('authToken', res.data.login.token, {
                path: '/',
                expires: new Date(new Date().getTime()+1000*60*60*24),
                maxAge: 60*60*24,
                domain: config('COOKIE_HOST'),
                secure: config('COOKIE_SECURE'),
                httpOnly: false,
                sameSite: true
              });
              history.push('/')
            }
            else if (res.data) {
              actions.setErrors(fromGqlErrors(res.data.login.errors));
            }
            actions.setSubmitting(false);
          })
        }}
        render={(props) => (
          <form method="POST" className="needs-validation form-auth form-register" onSubmit={props.handleSubmit} noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Please log in</h1>
            <TextInput name="email" type="text" label="Email address" placeholder="your@email.com" />
            <TextInput name="password" type="text" label="Password" placeholder="Password" />
            <p><button className="btn btn-lg btn-primary btn-block" type="submit">Login</button></p>
            <p>Don't have an account? <Link to='/register'>Create one now</Link></p>

          </form>

        )}
      />
    </div>
  )
}

export default withRouter(withCookies(Login));