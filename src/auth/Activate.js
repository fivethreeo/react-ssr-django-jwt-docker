import React, { useState } from "react";
import { withRouter, Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { useApolloClient } from 'react-apollo-hooks';
import { useServerContext } from '../utils/ServerContext';

import ActivateMutation from './ActivateMutation';
/*
class RealActivate extends React.Component {
  
  render () {
    if (this.props.data.loading) {
      return (<div></div>)
    }

    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <LoginFormWithRouter variables={{ email: '', password: '' }} />
        <p>Don't have an account? <Link to='/register'>Create one now</Link></p>
      </div>
    )
  }
}
*/

let Prom, isDone=false, active=null;

const Activate = ({ history }) => {

  const [sactive, ssetActive] = useServerContext('Activate', null);

  active = sactive===null ? active : sactive;

  const [token, setToken] = useQueryParam('token', StringParam);
  const [uid, setUid] = useQueryParam('uid', StringParam);
  const client = useApolloClient();
  console.log('1 '+active)

  if (active===null) {

    Prom = new Promise(function(resolve, reject) {

      client.mutate({
        mutation: ActivateMutation,
        variables: {
          token: token,
          uid: uid,
        },
      }).then(result => {
        ssetActive(result.data.activate.success)
        active=true
        resolve();
      }).catch(error => { 
        ssetActive(false)
        active=false
        resolve();
        console.log(error) });;
    });
    
    throw Prom;

  }
  
  let display = <p>Activation unsuccessful</p>
  
  if (active === true) {
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