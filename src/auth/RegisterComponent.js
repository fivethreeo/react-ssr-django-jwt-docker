import React, { useContext } from "react";
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import { Context  } from "urql";

import { TextField } from '../utils/FormUtils';
import { useSSRState } from '../hooks/useSSRState';
import { executeMutation, fromGqlErrors } from '../utils/SSRUtils';

import { RegisterSchema, RegisterMutation } from './RegisterCommon';

const Register = ({ history }) => {
  const client = useContext(Context);
  const [registration, hasSSRState, setRegistration] = useSSRState(
    {values: { email: '', password: '', passwordRepeat: '' }, errors: {} }, 'registration', []);

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <Formik
        initialValues={registration.values}
        initialErrors={registration.errors}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          executeMutation(client, RegisterMutation, values)
          .then((res)=>{
            if (res.data && res.data.register.success) {
              history.push('/login')
            }
            else if (res.data) {
              actions.setErrors(fromGqlErrors(res.data.register.errors));
            }
            actions.setSubmitting(false);
          })
        }}
        render={(props) => (
          <form method="POST" className="needs-validation form-auth form-register" onSubmit={props.handleSubmit} noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            <TextField name="email" type="text" label="Email address" placeholder="your@email.com" />
            <TextField name="password" type="text" label="Password" placeholder="Password" />
            <TextField name="passwordRepeat" type="email" label="Password (again)" placeholder="Password (again)" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
        )}
      />
    </div>
  )
}

export default withRouter(Register);