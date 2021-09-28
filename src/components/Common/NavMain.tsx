import React, { Component } from 'react';
import { Switch, Route, Link, BrowserRouter as Router } from 'react-router-dom';
import logo from "../Auth/assets/pm-logo.png"
import Collection from '../Collection/Collection'
import Wishlist from '../WishList/Wishlist'
import Admin from '../Admin/Admin'
import {Home} from './Home';
import { 
  Button,
  Navbar,
  Nav,
  NavItem,
   } from 'reactstrap';

interface NavProps {
    token: string
    clickLogout: () => void
    isAdmin: string
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
    this.props.isAdmin === 'true' ?
    <div>
      <Router>
      <div>
      <Navbar color="light" light expand="md" sticky="top">
        <Link to="/"><img src={logo} alt="Phonic Menagerie" className="logoImgNav"/></Link>
        <Nav className="mr-auto" navbar>
        <NavItem>
        <Link to="/collection" className="navLink">Collection</Link>
        </NavItem>
        <NavItem>
        <Link to="/wishlist" className="navLink">Wishlist</Link>
        </NavItem>
        <NavItem>
        <Link to="/admin" className="navLink">Admin</Link>
        </NavItem>
        <NavItem>
        <Button onClick={this.props.clickLogout} className="logoutBtn"><b>Logout</b></Button>
        </NavItem>
        </Nav>
      </Navbar>
      </div>
      <div>
      
        <Switch>
        <Route exact path="/"><Home /></Route>
          <Route exact path="/collection"><Collection token={this.props.token} clickLogout={this.props.clickLogout}/></Route>
          <Route exact path="/wishlist"><Wishlist token={this.props.token} clickLogout={this.props.clickLogout}/></Route>
          <Route exact path="/admin"><Admin token={this.props.token} clickLogout={this.props.clickLogout} isAdmin={this.props.isAdmin}/></Route>
        </Switch>
        
    </div>
    </Router>
    </div> 
    :
    <div>
    <Router>
    <div>
    <Navbar color="light" light expand="md" sticky="top">
      <Link to="/"><img src={logo} alt="Phonic Menagerie" className="logoImgNav"/></Link>
      <Nav className="mr-auto" navbar>
      <NavItem>
      <Link to="/collection" className="navLink">Collection</Link>
      </NavItem>
      <NavItem>
      <Link to="/wishlist" className="navLink">Wishlist</Link>
      </NavItem>
      <NavItem>
      <Button onClick={this.props.clickLogout} className="logoutBtn"><b>Logout</b></Button>
      </NavItem>
      </Nav>
    </Navbar>
    </div>
    <div>
    
      <Switch>
      <Route exact path="/"><Home /></Route>
        <Route exact path="/collection"><Collection token={this.props.token} clickLogout={this.props.clickLogout}/></Route>
        <Route exact path="/wishlist"><Wishlist token={this.props.token} clickLogout={this.props.clickLogout}/></Route>
      </Switch>
      
  </div>
  </Router>
  </div>
  );
}
}

export default NavMain;