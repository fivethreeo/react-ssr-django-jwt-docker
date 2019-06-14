import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useQueryParam, StringParam } from 'use-query-params';
import { useMutation } from 'react-apollo-hooks';
import ActivateMutation from './ActivateMutation';

const Activate = ({ history }) => {

  const [active, setActive] = React.useState(false);

  const [token, setToken] = process.env.BUILD_TARGET === 'client' ? useQueryParam('token', StringParam) : ['i','i'];
  const [uid, setUid] = process.env.BUILD_TARGET === 'client' ? useQueryParam('uid', StringParam) : ['i','i'];

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
    activateUser();
  }, []);
  
  let display;

  if (active) {
    display = <>
      <p>Activation successful</p>
      <p>You can now <Link to='/login'>sign in</Link></p>
    </>
  } else {
    display = <p>Activation unsuccessful</p>
  }

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      { display }
    </div>
  )
}


export default withRouter(Activate);