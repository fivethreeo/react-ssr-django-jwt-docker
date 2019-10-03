import * as Yup from 'yup';
import gql from 'graphql-tag';

export const RegisterSchema = Yup.object().shape({

  email: Yup.string()
    .email('Email must be a valid email')
    .required('Required'),
    password: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*+?])(?=.{8,})/,
      'Must contain 8 characters, one uppercase, ' +
      'one lowercase, one number and one special case character'
    ),
    passwordRepeat: Yup.string().when('password', {
      is: undefined,
      then: Yup.string().notRequired(),
      otherwise: Yup
        .string()
        .required()
        .oneOf([Yup.ref('password')], 'Passwords must match'),
    }),
});

export const RegisterMutation = gql`
  mutation RegisterMutation(
    $email: String!,
    $password: String!,
    $passwordRepeat: String!) {
    
    register(
      email: $email,
      password: $password,
      passwordRepeat: $passwordRepeat) {
        
      success
      errors
    }
  }
  `;

