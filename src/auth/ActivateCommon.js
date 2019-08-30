import gql from 'graphql-tag';
import { StringParam } from 'serialize-query-params';

export const QueryParams = { token: StringParam, uid: StringParam };

export const ActivateMutation = gql`
  mutation activate($token: String!, $uid: String!) {
    activate(token: $token, uid: $uid) {
      success
      errors
    }
  }`;
