import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem

} from 'reactstrap';
import { NavLink } from 'react-router-dom'

import './Navigation.css'
import Logo from '../../assets/burgert.png'

class Navigation extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div className="" style={{ backgroundColor: '#D70F64' }} >
                <Navbar
                    style={{
                        backgroundColor: '#D70F64',
                        color: '#fff'
                    }}
                    className={`navigation container`}
                    expand="md">
                    <NavbarBrand href="/">
                        <img width="150px" src={Logo} alt="Burger Builder" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem className='header_link' >
                                <NavLink to="/">Home</NavLink>
                            </NavItem>
                            <NavItem className='header_link'>
                                <NavLink to="/orders">Orders</NavLink>
                            </NavItem>
                            <NavItem className='header_link'>
                                <NavLink to="/checkout">Checkout</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation