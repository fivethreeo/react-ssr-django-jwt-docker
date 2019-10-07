import gql from 'graphql-tag';

export const SocialAuthMutation = gql`
  mutation SocialAuth($provider: String!, $redirectUri: String!) {
    socialAuth(provider: $provider, redirectUri: $redirectUri) {
      result {
        __typename
        ... on Redirect {
          url
        }
        ... on Html {
          content
        }
      }
    }
  }
`;

export const SocialAuthCompleteMutation = gql`
  mutation SocialAuthComplete($provider: String!, $requestData: JSONString!, $redirectUri: String!) {
    socialAuthComplete(provider: $provider, requestData: $requestData, redirectUri: $redirectUri) {
      result {
        __typename
        ... on JWT {
          social {
            uid
            extraData
          }
          token
          isSuccessfulLogin
          isInactiveUser
          isNew
          isNewAssociation
        }
        ... on Redirect {
          url
        }
        ... on Html {
          content
        }
      }
    }
  }
`;

