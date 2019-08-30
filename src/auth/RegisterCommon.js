import * as Yup from 'yup';
import gql from 'graphql-tag';

export const RegisterSchema = Yup.object().shape({
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
  mutation register($email: String!, $password: String!, $passwordRepeat: String!) {
    register(email: $email, password: $password, passwordRepeat: $passwordRepeat) {
      success
      errors
    }
  }`;

