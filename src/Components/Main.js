import React from 'react'
import Header from './Header/Header'
import BurgerBuilder from './BurgerBuilder/BurgerBuilder'
import Footer from './Footer/Footer'

const Main = (props) => {
    return (
        <div>
            <Header />
            <BurgerBuilder />
            <Footer />
        </div>
    )
}

export default Main