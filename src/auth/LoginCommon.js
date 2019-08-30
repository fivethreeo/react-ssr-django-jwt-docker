import * as Yup from 'yup';
import gql from 'graphql-tag';

export const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required('Required'),
  password: Yup.string()
    .required('Required')
});

export const LoginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      errors
      token
      user {
          email
      }
    }
  }`;