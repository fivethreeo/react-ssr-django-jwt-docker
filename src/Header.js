import React from 'react';
import { Jumbotron, Container } from 'reactstrap';

const Header = (props) => {
  return (
    <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
      <h1 className="display-3">django-razzle-secure</h1>
      <p className="lead">Razzle With Django Example.</p>
    </div>
  );
};

export default Header;
