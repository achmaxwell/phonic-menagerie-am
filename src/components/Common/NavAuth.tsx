import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';

interface NavProps {
    token?: string
    clickLogout: () => void
    updateToken(token: string): void
}

interface NavState {
    isOpen: boolean
}

class NavAuth extends Component <NavProps,NavState> {
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
        <NavbarBrand href="/">Phonic Menagerie</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="../Auth/Login">Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="../Auth/Signup">Register</NavLink>
            </NavItem>
          </Nav>
          <Button onClick={this.props.clickLogout}>Logout</Button>
      </Navbar>
    </div>
  );
}
}

export default NavAuth;