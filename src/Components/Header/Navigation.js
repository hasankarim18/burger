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
import { connect } from 'react-redux'


const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId
    }
}



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

        let links = null

        if (this.props.token === null) {
            links = <Nav className="mr-auto" navbar>
                <NavItem className='header_link'>
                    <NavLink to="/auth">Log in</NavLink>
                </NavItem>
            </Nav>
        } else {
            links = <Nav className="mr-auto" navbar>
                <NavItem className='header_link' >
                    <NavLink to="/">Home</NavLink>
                </NavItem>
                <NavItem className='header_link'>
                    <NavLink to="/orders">Orders</NavLink>
                </NavItem>
                <NavItem className='header_link'>
                    <NavLink to="/checkout">Checkout</NavLink>
                </NavItem>
                <NavItem className='header_link'>
                    <NavLink to="/logout">Log out</NavLink>
                </NavItem>
            </Nav>
        }


        return (
            <div className="" style={{ backgroundColor: '#D70F64' }} >
                <Navbar
                    style={{
                        backgroundColor: '#D70F64',
                        color: '#fff'
                    }}
                    dark
                    className={`navigation container`}
                    expand="md">
                    <NavbarBrand href="/">
                        <img width="150px" src={Logo} alt="Burger Builder" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse className="justify-content-end" isOpen={this.state.isOpen} navbar>
                        {links}
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Navigation)