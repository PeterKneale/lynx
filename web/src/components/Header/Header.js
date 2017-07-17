import React, { Component } from 'react';
import {Grid, Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

class Header extends Component {

  render() {
    return (
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">React-Bootstrap</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href="#">
            <NavLink to={'/dashboard'}>Dashboard</NavLink>
          </NavItem>
          <NavItem eventKey={2} href="#">
            <NavLink to={'/users'}>Users</NavLink>
          </NavItem>
        </Nav>  
        <Nav pullRight>
          <NavItem eventKey={1} href="#">Notifications</NavItem>
          <NavItem eventKey={2} href="#">Account</NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default Header;
