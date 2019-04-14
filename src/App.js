import './App.scss';
import React from 'react';
import loadable from '@loadable/component'
import { Route, Switch, NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

const Header = loadable(() =>
  import(/* webpackChunkName: "header" */ './Header')
);
const Body = loadable(() => import(/* webpackChunkName: "body" */ './Body'));
const Login = loadable(() => import(/* webpackChunkName: "login" */ './Login'));

const Footer = loadable(() =>
  import(/* webpackChunkName: "footer" */ './Footer')
);

const App = () => (
  <Container>
    <Row>
      <Col>
        <Header />
      </Col>
    </Row>
    <Row>
      <Col>
        <Switch>
          <Route
            exact
            path="/"
            component={Body} 
          />
          <Route path="/login" component={Login} />
        </Switch>
      </Col>
    </Row>
    <Row>
      <Col>
        <Footer />
      </Col>
    </Row>
  </Container>
);

export default App;
