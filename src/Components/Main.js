import React from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Footer from './Footer/Footer'
import Orders from './Orders/Orders'
import Checkout from './Orders/Checkout/Checkout'
import Auth from './Auth/Auth'
import { Routes, Route, Navigate } from 'react-router-dom'

const Main = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div className="container" style={{ marginBottom: '50px' }} >
                {/* <BurgerBuilder /> */}
                <Routes >
                    <Route path='/' element={<BurgerBuilder />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>

            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Main