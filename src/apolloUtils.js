import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink, concat } from "apollo-link";
import { InMemoryCache } from "apollo-cache-inmemory";

let api_uri = process.env.RAZZLE_API_URI;

if (process.env.NODE_ENV === 'development') {
  api_uri = 'http://' + process.env.HOST + ':' + (parseInt(process.env.PORT) + 2);
}

export const isAuthenticated = (cookies) => {
  const token = cookies.get("authToken");
  return !!(token) ? true : false;
};

export const unAuthenticate = (cookies) => {
  cookies.remove("authToken");
};

export const getApolloClient({ history, cookies }) => {

  const httpLink = new HttpLink({ uri: api_uri });

  const authErrorLink = onError(({ graphQLErrors }) => {
    const hasUnauthorized = graphQLErrors && graphQLErrors.find(error => {
      const { message } = error;
      return message.includes("expired");
    });
    if (hasUnauthorized) {
      unAuthenticate(cookies);
      history.push("/login");
    }
  });

  const cache = new InMemoryCache();

  const authMiddleware = new ApolloLink((operation, forward) => {
    if (isAuthenticated(cookies)) {
      // add the authorization to the headers
      operation.setContext({
        headers: {
          Authorization: `Bearer ${cookies.get("authToken")}`,
        },
      });
    }
    return forward(operation);
  });

  const client = new ApolloClient({
    link: authErrorLink.concat(concat(authMiddleware, httpLink)),
    cache: cache,
  });

  return client;
}