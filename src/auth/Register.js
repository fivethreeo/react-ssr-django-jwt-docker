import React from 'react';
import { withRouter } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { withFormik } from 'formik';
import RegisterSchema from './RegisterSchema';
import RegisterMutation from './RegisterMutation';
import RegisterForm from './RegisterForm';

const handleSubmit = (payload, { props, setSubmitting, setErrors }) => {
  const {email, password, passwordRepeat } = payload
  console.log('submit')
  props.registerUser({ variables: { email, password, passwordRepeat } })
    .then((response) => {
      props.history.push('/')
    }).catch((e) => {
      const errors = e.graphQLErrors.map(error => error.message)
      console.log(errors)
      setSubmitting(false)
      setErrors({ email: ' ', password: ' ', passwordRepeat: ' ', form: errors })
    })
}

const RegisterFormWithGraphQL = compose(
  graphql(RegisterMutation, {name: 'registerUser'}),
  withFormik({
    validationSchema: RegisterSchema,
    mapPropsToValues: ({ variables }) => ({
      ...variables
    }),
    handleSubmit: handleSubmit,
    displayName: 'Register'
  })
)(RegisterForm)

const RegisterFormWithRouter = withRouter(RegisterFormWithGraphQL)

class Register extends React.Component {
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
        <RegisterFormWithRouter variables={{ email: '', password: '', passwordRepeat: '' }} />
      </div>
    )
  }
}

export default Register;