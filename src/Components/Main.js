import React, { useEffect } from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Footer from './Footer/Footer'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout/Checkout'
import Auth from './Auth/Auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { authCheck } from '../redux/authActionCreators'

import { useNavigate } from "react-router-dom";

import Logout from './Auth/Logout'

const mapStateToProps = state => {

    return {
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck())
    }
}


const Main = (props) => {

    let routes = null
    if (props.token === null) {
        routes = <Routes >
            <Route path='/' element={<BurgerBuilder />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    } else {
        routes = <Routes >
            <Route path='/' element={<BurgerBuilder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/logout" element={<Logout />} />
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
    }

    useEffect(() => {
        props.authCheck()
    }, [])

    return (
        <React.Fragment>
            <Header />
            <div className="container" style={{ marginBottom: '50px' }} >
                {/* <BurgerBuilder /> */}
                {routes}
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)