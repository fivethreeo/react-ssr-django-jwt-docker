import './App.scss';
import React from 'react';

import loadable from '@loadable/component';
import { Route, Switch } from 'react-router-dom';

import { Container, Row, Col } from "reactstrap";

const Header = loadable(() =>
  import(/* webpackChunkName: "header" */ './Header')
);
const Body = loadable(() => import(/* webpackChunkName: "body" */ './Body'));
const Login = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/LoginComponent'));
const Register = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/RegisterComponent'));
const Activate = loadable(() => import(/* webpackChunkName: "auth" */ '../auth/ActivateComponent'));
const TodoOverView = loadable(() => import(/* webpackChunkName: "auth" */ '../todos/TodoOverView'));

const Footer = loadable(() =>
  import(/* webpackChunkName: "footer" */ './Footer')
);
const OneRowOneCol = (Component) => {
  return (props) => (<Row><Col><Component {...props} /></Col></Row>)
}
const App = () => {
 return (
   <>
   <Header />
   <Container>
          <Switch>
            <Route
              exact
              path="/"
              component={TodoOverView} 
            />
            <Route path="/activate" component={OneRowOneCol(Activate)} />
            <Route path="/login" component={OneRowOneCol(Login)} />
            <Route path="/register" component={OneRowOneCol(Register)} />
          </Switch>
      <Row>
          <Footer />
      </Row>
    </Container>
    </>
  );
};
export default App;
