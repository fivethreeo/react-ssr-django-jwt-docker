import React, { useContext } from 'react';
import { AxiosContext } from './Axios';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput, CheckboxInput } from './FormUtils';

export default Register => {

  const { register } = useContext(AxiosContext);

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <Formik
        initialValues={{ username: '', email: '', password: '', password_again: '' }}
        onSubmit={(values, { setSubmitting }) => {
          register(values.username, values.email, values.password);
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().matches(
            /[a-zA-Z][a-zA-Z0-9-_]{6,32}/,
            "Must Contain 6 Characters"
          ),
          email: Yup.string()
            .email()
            .required('Required'),
            password: Yup.string().matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\+\?])(?=.{8,})/,
              "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
            ),
            password_again: Yup.string().when('password', {
              is: undefined,
              then: Yup.string().notRequired(),
              otherwise: Yup
                .string()
                .required()
                .oneOf([Yup.ref('password')], 'Passwords must match'),
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
            <form className="needs-validation form-auth form-register" onSubmit={handleSubmit} novalidate>
              <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
              <TextInput
                id="inputUsername"
                name="username"
                labelClassName="sr-only"
                type="text"
                label="Username"
                placeholder="Username"
                touched={touched.username}
                error={touched.username && errors.username}
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
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
              <TextInput
                id="inputPasswordAgain"
                name="password_again"
                labelClassName="sr-only"
                type="password"
                label="Password (again)"
                placeholder="Password (again)"
                touched={touched.password_again}
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

