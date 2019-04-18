import './App.scss';
import React from 'react';
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom';

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
 <div className="container">
    <div className="row">
        <Header />
    </div>
    <div className="row">
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
    <div className="row">
        <Footer />
    </div>
  </div>
);

export default App;
