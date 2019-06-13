import gql from 'graphql-tag';


const RegisterMutation = gql`
  mutation register($email: String!, $password: String!, $passwordRepeat: String!) {
    register(email: $email, password: $password, passwordRepeat: $passwordRepeat) {
      success
      errors
    }
  }`;

  export default RegisterMutation;