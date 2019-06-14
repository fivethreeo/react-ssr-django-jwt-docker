import gql from 'graphql-tag';


const ActivateMutation = gql`
  mutation activate($token: String!, $uid: String!) {
    activate(token: $token, uid: $uid) {
      success
      errors
    }
  }`;

export default ActivateMutation;