import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { LOGOUT } from '../constants';
import { AuthContext } from '../AuthConfig';

const Header = () => {
  const { authState, authDispatch } = useContext(AuthContext);

  const handleLogout = () => {
    authDispatch({ type: LOGOUT });
  };

  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand as={Link} to="/">
        HL7 Admin
      </Navbar.Brand>
      {authState && authState.token ? (
        <>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/add/mp">
                Add Medical Practitioner
              </Nav.Link>
              <Nav.Link as={Link} to="/add/hospital">
                Add Hospital
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : null}
    </Navbar>
  );
};

export default Header;
