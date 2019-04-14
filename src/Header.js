import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Header = (props) => {
  return (
      <Jumbotron>
          <h1 className="display-3">This is my Header</h1>
          <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
      </Jumbotron>
  );
};

export default Header;
