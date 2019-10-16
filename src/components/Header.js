import React from 'react';
import { Navbar, Alignment } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';


const Header = () => {

  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Blueprint</Navbar.Heading>
      </Navbar.Group>
      <Navbar.Group align={Alignment.RIGHT}>
        <NavLink className="bp3-button bp3-minimal bp3-icon-home"
          activeClassName="bp3-active" to="/" exact>Home</NavLink>
        <NavLink className="bp3-button bp3-minimal bp3-icon-people"
          activeClassName="bp3-active" to="/todos">Todos</NavLink>
        <Navbar.Divider />
        <NavLink className="bp3-button bp3-minimal bp3-icon- bp3-icon-user"
          activeClassName="bp3-active" to="/accounts" exact></NavLink>
      </Navbar.Group>
    </Navbar>
  );
};

export default Header;
