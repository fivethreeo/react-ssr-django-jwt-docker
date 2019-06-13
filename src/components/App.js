import './App.scss';
import React from 'react';
import loadable from '@loadable/component'
import { Route, Switch } from 'react-router-dom';

const Header = loadable(() =>
  import(/* webpackChunkName: "header" */ './Header')
);
const Body = loadable(() => import(/* webpackChunkName: "body" */ './Body'));
// const Login = loadable(() => import(/* webpackChunkName: "login" */ '../auth/Login'));
const Register = loadable(() => import(/* webpackChunkName: "register" */ '../auth/Register'));

const Footer = loadable(() =>
  import(/* webpackChunkName: "footer" */ './Footer')
);

const App = () => {
 return (
   <>
   <Header />
   <div className="container">
      <div className="row">
          <Switch>
            <Route
              exact
              path="/"
              component={Body} 
            />
            <Route path="/register" component={Register} />
          </Switch>
      </div>
      <div className="row">
          <Footer />
      </div>
    </div>
    </>
  );
};
export default App;
