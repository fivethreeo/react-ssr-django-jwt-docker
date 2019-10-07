import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { parse as parseQueryString } from 'query-string';
import serialize from 'serialize-javascript';

import { Context  } from 'urql';
import { withCookies } from '../common/CookieContext';

import { useServerNoopEffect } from '../hooks/IsomorphicEffects';

import { executeMutation } from '../utils/SSRUtils';
import { SocialAuthMutation, SocialAuthCompleteMutation } from './SocialAuthCommon';
import config from '../config';

const SocialAuthBegin = ({
  match: { params: { provider } },
  history
}) => {

  const [error, setError] = useState('');

  const client = useContext(Context);
 
  useServerNoopEffect(() => {
    executeMutation(client,  SocialAuthMutation, {
      provider: provider,
      redirectUri: config('APP_URL') + '/social/' + provider + '/complete'
    })
    .then((res)=>{
      if (res.error && res.error.graphQLErrors) {
        setError(res.error.graphQLErrors[0].message);
      }
      else if (res.data && res.data.socialAuth) {
        if (res.data.socialAuth.result.__typename === 'Redirect') {
          window.location.href = res.data.socialAuth.result.url;
        }
      }
    })

  }, []);

  if (error) {
    return <p>{error}</p>;
  } else {
    return <p>test</p>;
  }

};

const SocialAuthComplete = ({
  match: { params: { provider } },
  history,
  cookies
}) => {

  const [error, setError] = useState('');

  const client = useContext(Context);
 
  useServerNoopEffect(() => {
    const requestData = serialize(
      parseQueryString(history.location.search, {parseNumbers:true})
    );

    executeMutation(client, SocialAuthCompleteMutation, {
      provider: provider,
      requestData: requestData,
      redirectUri: config('APP_URL') + '/social/' + provider + '/complete'
    }).then((res)=>{

      if (res.error && res.error.graphQLErrors) {
        setError(res.error.graphQLErrors[0].message);
      }
      else if (res.data && res.data.socialAuthComplete) {
        if (res.data.socialAuthComplete.result.__typename === 'Redirect') {
          window.location.href = res.data.socialAuthComplete.result.url;
        }
        if (res.data.socialAuthComplete.result.__typename === 'JWT') {
          cookies.set('authToken', res.data.socialAuthComplete.result.token, {
            path: '/',
            expires: new Date(new Date().getTime()+1000*60*60*24),
            maxAge: 60*60*24,
            domain: config('COOKIE_HOST'),
            secure: config('COOKIE_SECURE'),
            httpOnly: false,
            sameSite: true
          })
        }
      }
    })

  }, []);

  if (error) {
    return <p>{error}</p>;
  } else {
    return <p>test</p>;
  }
};

const SocialAuthCompleteCookies = withCookies(SocialAuthComplete);

const SocialAuth = () => {

  return (
    <Switch>
      <Route
        exact
        path="/social/:provider"
        component={SocialAuthBegin} 
      />
      <Route path="/social/:provider/complete" component={SocialAuthCompleteCookies} />
    </Switch>
  );

};

export default SocialAuth;