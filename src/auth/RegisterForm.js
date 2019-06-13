import React from 'react';
import { TextInput, CheckboxInput } from '../utils/FormUtils';

const RegisterForm = ({
  values,
  touched,
  errors,
  dirty,
  isSubmitting,
  handleChange,
  handleBlur,
  handleSubmit,
  handleReset,
}) =>
  <form className="needs-validation form-auth form-register" onSubmit={handleSubmit} noValidate>
    <h1 className="h3 mb-3 font-weight-normal">Please register</h1>

    <TextInput
      id="inputEmail"
      name="email"
      labelClassName="sr-only"
      type="text"
      label="Email address"
      placeholder="your@email.com"
      touched={touched.email}
      error={errors.email && touched.email && errors.email}
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
      error={errors.password && touched.password && errors.password}
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <TextInput
      id="inputPasswordRepeat"
      name="passwordRepeat"
      labelClassName="sr-only"
      type="password"
      label="Password (again)"
      placeholder="Password (again)"
      touched={touched.passwordRepeat}
      error={errors.passwordRepeat && touched.passwordRepeat && errors.passwordRepeat}
      value={values.passwordRepeat}
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
  </form>

export default RegisterForm;