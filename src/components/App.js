import './App.scss';
import React from 'react';

import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';


const Header = loadable(() =>
  import(/* webpackChunkName: "header" */ './Header')
);
const Login = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/LoginComponent'));
const Register = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/RegisterComponent'));
const Activate = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/ActivateComponent'));
const Social = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/SocialAuthComponent'));
const TodoOverView = loadable(() => import(/* webpackChunkName: "todo" */ '../todos/TodoOverView'));

const Footer = loadable(() =>
  import(/* webpackChunkName: "footer" */ './Footer')
);
const OneRowOneCol = (Component) => {
  return (props) => (<div className="row">
      <div className="col-sm"><Component {...props} /></div></div>)
}
const App = () => {
 return (
   <>
   <Header />
     <div className="container">
      <Switch>
        <Route
          exact
          path="/"
          component={TodoOverView} 
        />
        <Route path="/activate" component={OneRowOneCol(Activate)} />
        <Route path="/login" component={OneRowOneCol(Login)} />
        <Route path="/register" component={OneRowOneCol(Register)} />
        <Route path="/social/:provider" component={OneRowOneCol(Social)} />
      </Switch>
      <div className="row">
          <Footer />
      </div>
    </div>
    </>
  );
};
export default App;
