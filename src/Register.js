import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Login extends React.Component {
  render() {
    return (
      <>
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <form class=".form-auth form-register">
          <h1 class="h3 mb-3 font-weight-normal">Please register</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" name="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" name="password" id="inputPassword" class="form-control" placeholder="Password" required />
          <label for="inputPasswordAgain" class="sr-only">Password (again)</label>
          <input type="password" name="password_again" id="inputPasswordAgain" class="form-control" placeholder="Password (again)" required />
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
      </>
    );
  }
}
