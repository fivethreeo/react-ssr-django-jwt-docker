import React, { useState, useEffect } from "react";
import { withRouter, Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { useQuery } from "urql";
import ActivateMutation from './ActivateMutation';

import { useImmediateEffect } from '../hooks/useImmediateEffect';
import { useSSRState } from '../hooks/useSSRState';

const UNSET = 0;
const TRUE = 1;
const FALSE = 2;

const Activate = ({ history }) => {

  const [token, setToken] = useQueryParam('token', StringParam);
  const [uid, setUid] = useQueryParam('uid', StringParam);
  const res = useQuery({ query: ActivateMutation, variables: { token: token, uid: uid }});
  const [activated, setActivated] = useSSRState(UNSET, 'activated');


  let display = <p>Activation unsuccessful</p>
    
    if (res.data && res.data.success) {

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