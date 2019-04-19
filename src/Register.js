import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, CheckboxInput } from './FormUtils';

export default class Login extends React.Component {
  render() {
    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <Formik
          initialValues={{ email: '' }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Required'),
              password: Yup.string(),
              password_again: Yup.string().when('password', {
                is: undefined,
                then: Yup.string().notRequired(),
                otherwise: Yup
                  .string()
                  .required()
                  .oneOf([Yup.ref('password')], 'passwords must match'),
              }),
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form className="form-auth form-register" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
                <TextInput
                  id="inputEmail"
                  name="email"
                  labelClassName="sr-only"
                  type="text"
                  label="Email address"
                  placeholder="your@email.com"
                  error={touched.email && errors.email}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id="inputPassword"
                  name="password"
                  labelClassName="sr-only"
                  type="password"
                  label="Password"
                  placeholder="Password"
                  error={touched.password && errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <TextInput
                  id="inputPasswordAgain"
                  name="password_again"
                  labelClassName="sr-only"
                  type="password"
                  label="Password (again)"
                  placeholder="Password (again)"
                  error={touched.password_again && errors.password_again}
                  value={values.password_again}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <CheckboxInput
                  id="inputRemember"
                  name="rememberme"
                  className="mb-3"
                  type="checkbox"
                  label="Remember me"
                  placeholder="Password"
                  error={touched.remember && errors.remember}
                  value={values.remember}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              </form>
            );
          }}
        </Formik>
      </div>
    );
  }
}
