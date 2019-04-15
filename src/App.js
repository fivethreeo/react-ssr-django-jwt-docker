import './App.scss';
import React from 'react';
import loadable from '@loadable/component'
import { Route, Switch, NavLink } from 'react-router-dom';

const Header = loadable(() =>
  import(/* webpackChunkName: "header" */ './Header')
);
const Body = loadable(() => import(/* webpackChunkName: "body" */ './Body'));
const Login = loadable(() => import(/* webpackChunkName: "login" */ './Login'));
const Register = loadable(() => import(/* webpackChunkName: "register" */ './Register'));

const Footer = loadable(() =>
  import(/* webpackChunkName: "footer" */ './Footer')
);

const App = () => (
 <div class="container">
    <div class="row">
        <Header />
    </div>
    <div class="row">
        <Switch>
          <Route
            exact
            path="/"
            component={Body} 
          />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
    </div>
    <div class="row">
        <Footer />
    </div>
  </div>
);

export default App;
