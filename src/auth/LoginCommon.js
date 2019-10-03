import * as Yup from 'yup';
import gql from 'graphql-tag';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email')
    .required('Required'),
  password: Yup.string()
    .required('Required')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+?])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, ' +
      'one lowercase, one number and one special case character'
    )
});

export const LoginMutation = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }`;