import gql from 'graphql-tag';


const LoginMutation = gql`
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

export default LoginMutation;