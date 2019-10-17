import config from '../../config';
import nodeFetch from 'node-fetch';

import { getParsedCookies, getCookie } from './cookies';

import {
  Client,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange
} from 'urql';

const getUrqlProps = (req, res) => {
  const urqlSSRCache = ssrExchange();
  const urqlClient = new Client({
    fetch: async (url, opts) => {
      return nodeFetch(url, opts).then((fetch_res) => {
        // Pass session cookie from django for social auth state session var
        const parsed_cookies = getParsedCookies(fetch_res.headers.raw()['set-cookie']);
        const session_cookie = getCookie(parsed_cookies, "sessionid");
        if (session_cookie) {
          res.append('set-cookie', session_cookie.toString());
        }
        return fetch_res;
      }) 
    },
    fetchOptions: () => {
      const token = req.universalCookies.get('authToken');
      let opts = {
        // Pass session cookie down to django for social auth
        headers: { cookie: req.headers.cookie }
      };
      if (token) {
        opts.headers['Authorization'] = `JWT ${token}`
      }
      return opts;
    },
    exchanges: [
      dedupExchange,
      cacheExchange,
      // Put the exchange returned by calling ssrExchange after your cacheExchange,
      // but before any asynchronous exchanges like the fetchExchange:
      urqlSSRCache,
      fetchExchange,
    ],
    url: config('GRAPHQL_URL'),
    suspense: true
  });
  return { urqlSSRCache, urqlClient };
};

export default getUrqlProps;