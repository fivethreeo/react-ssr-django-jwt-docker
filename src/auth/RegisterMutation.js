import gql from 'graphql-tag';

const RegisterMutation = gql`
  mutation {
    post(username: $username, email: $email, password: $password) {

      username
      email
      password
    }
  }`;

  export default RegisterMutation;