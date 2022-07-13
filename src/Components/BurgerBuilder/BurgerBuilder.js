import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls '


export class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 1 },
            { type: 'meat', amount: 1 },
            { type: 'cheese', amount: 1 }
        ]
    }
    render() {
        return (
            <div className="row">
                <div className="col-sm-6 col-12">
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div className="col-sm-6 col-12 ">
                    <div className="pt-5" >
                        <Controls />
                    </div>

                </div>
            </div>
        )
    }
}

export default BurgerBuilder