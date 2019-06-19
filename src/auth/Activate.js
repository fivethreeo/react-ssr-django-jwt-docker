import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { useMutation } from 'react-apollo-hooks';
//import { useServerContext } from '../utils/ServerContext';

import ActivateMutation from './ActivateMutation';

class RealActivate extends React.Component {
  
  render () {
    /*if (this.props.data.loading) {
      return (<div></div>)
    }*/

    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <LoginFormWithRouter variables={{ email: '', password: '' }} />
        <p>Don't have an account? <Link to='/register'>Create one now</Link></p>
      </div>
    )
  }
}

const Activate = ({ history }) => {


  // const [state, setContext] = useServerContext('Activate');

  const [active, setActive] = React.useState(false);
  const [token, setToken] = useQueryParam('token', StringParam);
  const [uid, setUid] = useQueryParam('uid', StringParam);

  const activateUser = useMutation(ActivateMutation, {
    update: (proxy, mutationResult) => {
      if (mutationResult.data.activate.success) {
        setActive(true);
      }
    },
    variables: {
      token: token,
      uid: uid,
    },
  });

  React.useEffect(() => {
  //  activateUser();
  },[]);
  
  let display = <p>Activation unsuccessful</p>
  
  if (true) {
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