import React from 'react';
import { withRouter, Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { withFormik } from 'formik';
import { withCookies } from '../utils/CookieContext';
import LoginSchema from './LoginSchema';
import LoginMutation from './LoginMutation';
import LoginForm from './LoginForm';

const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  const {email, password } = payload
  console.log('submit')
  props.LoginUser({ variables: { email, password } })
    .then((response) => {
      props.cookies.set('authToken', response.data.login.token, {
        path: '/',
        expires: new Date(new Date().getTime()+1000*60*60*24),
        maxAge: 60*60*24,
        domain: process.env.HOST,
        secure: process.env.RAZZLE_NO_HTTPS === 'true' ? false : true,
        httpOnly: false,
        sameSite: true
      });
      props.history.push('/')
    }).catch((e) => {
      const errors = e.graphQLErrors.map(error => error.message)
      console.log(errors)
      setSubmitting(false)
      setErrors({ email: ' ', password: ' ', form: errors })
    })
}

const LoginFormWithGraphQL = compose(
  withCookies,
  graphql(LoginMutation, {name: 'LoginUser'}),
  withFormik({
    validationSchema: LoginSchema,
    mapPropsToValues: ({ variables }) => ({
      ...variables
    }),
    handleSubmit: handleSubmit,
    displayName: 'Login'
  })
)(LoginForm)

const LoginFormWithRouter = withRouter(LoginFormWithGraphQL)

class Login extends React.Component {
  componentWillUpdate (nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      this.props.history.push('/dashboard')
    }
  }

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

export default Login;