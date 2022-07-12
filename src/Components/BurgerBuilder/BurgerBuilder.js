import React, { Component } from 'react'
import Burger from './Burger/Burger'


export class BurgerBuilder extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 col-12">
                    <Burger />
                </div>
                <div className="col-sm-6 col-12 ">
                    control
                </div>
            </div>
        )
    }
}

export default BurgerBuilder