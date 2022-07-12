import React from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Footer from './Footer/Footer'

const Main = (props) => {
    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <BurgerBuilder />
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Main