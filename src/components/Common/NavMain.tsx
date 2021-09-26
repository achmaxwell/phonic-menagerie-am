import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from 'reactstrap';

interface NavProps {
    token?: string
    clickLogout(): void
}

interface NavState {
    isOpen: boolean
}

class NavMain extends Component <NavProps,NavState> {
    constructor(props: NavProps) {
        super (props)
        this.state= {
            isOpen: false
        }
    }

render() {
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">reactstrap</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Simple Text</NavbarText>
      </Navbar>
    </div>
  );
}
}

export default NavMain;