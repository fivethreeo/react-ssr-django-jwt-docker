import React, { useState, useEffect, useContext } from 'react';
import { Route, Switch } from 'react-router-dom';
import { parse as parseQueryString } from 'serialize-query-params';

import { Context  } from 'urql';

import { executeMutation } from '../utils/SSRUtils';
//import { SocialAuthMutation } from './SocialAuthCommon';

const SocialAuthBegin = ({
  match: { params: { provider } },
  history: { location }
}) => {

  const client = useContext(Context);
 
  useEffect(() => {
/*parseQueryString(location.search)
  if (!hasSSRState && typeof window !== 'undefined') {

      executeMutation(client, SocialAuthMutation, { token: token, uid: uid })
      .then((res)=>{

        if (res.data && res.data.success) {
          setActivated(true);
        }
        else {
          setActivated(false);
        }
        
      })

    } */

  });

  return null;

};

const SocialAuthComplete = ({
  match: { params: { provider } },
  history: { location }
}) => {

  const client = useContext(Context);
 
  useEffect(() => {
/*parseQueryString(location.search)
  if (!hasSSRState && typeof window !== 'undefined') {

      executeMutation(client, SocialAuthMutation, { token: token, uid: uid })
      .then((res)=>{

        if (res.data && res.data.success) {
          setActivated(true);
        }
        else {
          setActivated(false);
        }
        
      })

    } */

  });

  return null;

};

const SocialAuth = () => {

  useEffect(() => {


  });


  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
    <Switch>
        <Route
          exact
          path="/:provider"
          component={SocialAuthBegin} 
        />
        <Route path="/:provider/complete" component={SocialAuthComplete} />
      </Switch>
    </div>
  );

};

export default SocialAuth;