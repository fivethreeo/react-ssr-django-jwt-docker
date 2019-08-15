import React, { useState } from "react";
import { withRouter, Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { useMutation } from "urql";
import ActivateMutation from './ActivateMutation';

const Activate = ({ history }) => {

  const [token, setToken] = useQueryParam('token', StringParam);
  const [uid, setUid] = useQueryParam('uid', StringParam);
  const [res, executeMutation] = useMutation(ActivateMutation);
  
  if (res) {
      
    //ssetActive(result.data.activate.success)
    
    let display = <p>Activation unsuccessful</p>
    
    if (res.data.activate.success) {
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
  
  executeMutation({token: token, uid: uid})
}


export default withRouter(Activate);