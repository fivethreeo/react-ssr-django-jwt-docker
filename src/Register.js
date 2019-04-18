import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <form className=".form-auth form-register">
          <h1 className="h3 mb-3 font-weight-normal">Please register</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input type="email" name="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
          <label htmlFor="inputPassword" className="sr-only">Password</label>
          <input type="password" name="password" id="inputPassword" className="form-control" placeholder="Password" required />
          <label htmlFor="inputPasswordAgain" className="sr-only">Password (again)</label>
          <input type="password" name="password_again" id="inputPasswordAgain" className="form-control" placeholder="Password (again)" required />
          <button className="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    );
  }
}
