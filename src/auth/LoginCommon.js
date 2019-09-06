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
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }`;