import React, { useContext } from "react";
import { withRouter } from 'react-router-dom'
import { Formik } from 'formik';
import { Context  } from "urql";

import { TextInput } from '../utils/FormUtils';
import { useSSRState } from '../hooks/useSSRState';
import { executeMutation } from '../utils/SSRUtils';

import { RegisterSchema, RegisterMutation } from './RegisterCommon';

const Register = ({ history }) => {
  const client = useContext(Context);
  const [registration, hasSSRState, setRegistration] = useSSRState({}, 'registration', []);

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <Formik
        initialValues={{ email: '', password: '', passwordRepeat: '' }}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          executeMutation(client, RegisterMutation, values)
          .then((res)=>{
            if (res.data && res.data.register.success) {
              history.push('/login')
            }
            else {
            }
            actions.setSubmitting(false);
          })
        }}
        render={(props) => (
          <form className="needs-validation form-auth form-register" onSubmit={props.handleSubmit} noValidate>
          <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
            <TextInput name="email" type="text" label="Email address" placeholder="your@email.com" />
            <TextInput name="password" type="text" label="Password" placeholder="Password" />
            <TextInput name="passwordRepeat" type="email" label="Password (again)" placeholder="Password (again)" />
            <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
          </form>
        )}
      />
    </div>
  )
}

export default withRouter(Register);