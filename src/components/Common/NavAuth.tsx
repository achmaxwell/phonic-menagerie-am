import React, { Component } from 'react';
import './Styles.css';
import logo from "../Auth/assets/pm-logo.png"
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
        <NavbarBrand href="/"><img src={logo} alt="Phonic Menagerie" className="logoImgNav"/></NavbarBrand>
          {/* <Button onClick={this.props.clickLogout}>Logout</Button> */}
      </Navbar>
    </div>
  );
}
}

export default NavAuth;