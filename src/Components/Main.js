import React, { useEffect } from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Footer from './Footer/Footer'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout/Checkout'
import Auth from './Auth/Auth'
import { Routes, Route, Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

import { useNavigate } from "react-router-dom";

const mapStateToProps = state => {

    return {
        token: state.token
    }
}


const Main = (props) => {

    let routes = null
    if (props.token === null) {
        routes = <Routes >
            <Route path='/' element={<BurgerBuilder />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    } else {
        routes = <Routes >
            <Route path='/' element={<BurgerBuilder />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    }

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

export default connect(mapStateToProps)(Main)