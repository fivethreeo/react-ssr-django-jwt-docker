import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from 'react-router-dom';
import { useQueryParams } from 'use-query-params';
import { useQuery, Context  } from "urql";

import executeMutation from '../utils/UrqlUtils';
import { useImmediateEffect } from '../hooks/useImmediateEffect';
import { useSSRState } from '../hooks/useSSRState';

import { ActivateMutation, QueryParams } from './ActivateCommon';


const Activate = ({ history }) => {
  const [{ token, uid }, setQuery] = useQueryParams(QueryParams);
  const client = useContext(Context);
  const [activated, hasSSRState, setActivated] = useSSRState(false, 'activated', [ token, uid ]);
 
  useEffect(() => {

    if (!hasSSRState && typeof window !== 'undefined') {

      executeMutation(client, ActivateMutation, { token: token, uid: uid })
      .then((res)=>{

        if (res.data && res.data.success) {
          setActivated(true);
        }
        else {
          setActivated(false);
        }
        
      })

    }

  });

  let display = <p>Activation unsuccessful</p>
    
    if (activated) {

      display = <>
        <p>Activation successful</p>
        <p>You can now <Link to='/login'>sign in</Link></p>
      </>
    
  }

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      { display }
    </div>
  )

}

export default withRouter(Activate);