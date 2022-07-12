import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,

} from 'reactstrap';

import classes from './Navigation.module.css'
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
                    className={`${classes.navigation} container`}
                    expand="md">
                    <NavbarBrand href="/">
                        <img width="150px" src={Logo} alt="Burger Builder" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink href="/Home">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Navigation