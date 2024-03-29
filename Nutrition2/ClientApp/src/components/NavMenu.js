import React, { Component } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import { StyledNavbarContainer } from '@nextui-org/react';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white mb-3 shadow-sm " container light>
                <NavbarBrand tag={Link} to="/"><div className="logo"></div><div className="brand">Nutri</div></NavbarBrand>
            <ul className="navbar-nav flex-grow">
            
            </ul>
        </Navbar>
      </header>
    );
  }
}
/* <NavItem>
               <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
             </NavItem>
             <NavItem>
               <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
             </NavItem>
             <NavItem>
               <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
             </NavItem> 
             
              <LoginMenu>
              </LoginMenu>q*/