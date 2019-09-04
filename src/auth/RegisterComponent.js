import React, { useContext } from "react";
import { withRouter } from 'react-router-dom'
import { withFormik } from 'formik';

import { useSSRState } from '../hooks/useSSRState';
import { executeMutation } from '../utils/SSRUtils';

import { RegisterSchema, RegisterMutation } from './RegisterCommon';


const Register = ({ history }) => {
  const [registration, hasSSRState, setRegistration] = useSSRState(false, 'registration', []);
  useEffect(() => {
    if (!user) {
      history.push('/dashboard')
    }
  }, [user])

  return (
    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <RegisterFormWithRouter variables={{ email: '', password: '', passwordRepeat: '' }} />
    </div>
  )
}

export default withRouter(Register);