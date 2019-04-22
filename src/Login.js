import React, { useContext } from 'react';
import { AxiosContext } from './Axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, CheckboxInput } from './FormUtils';

export default Login => {

  const { login } = useContext(AxiosContext);

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <Formik
        initialValues={{ email: '', password: ''}}
        onSubmit={(values, { setSubmitting }) => {
          login(values.email, values.password);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Required'),
          password: Yup.string()
            .required('Required')
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
            validateField,
            validateForm
          } = props;
          return (
            <form className="form-auth form-signin" onSubmit={handleSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <TextInput
                id="inputEmail"
                name="email"
                labelClassName="sr-only"
                type="text"
                label="Email address"
                placeholder="your@email.com"
                touched={touched.email}
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
                touched={touched.password}
                error={touched.password && errors.password}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <CheckboxInput
                id="inputRemember"
                name="rememberme"
                className="mb-3"
                labelClassName="form-check-label"
                type="checkbox"
                label="Remember me"
                touched={touched.remember}
                error={touched.remember && errors.remember}
                value={values.remember}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
            </form>
          );
        }}
      </Formik>
    </div>
  );
}

