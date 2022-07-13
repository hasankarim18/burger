import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls '


export class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'meat', amount: 0 },
            { type: 'cheese', amount: 0 }
        ]
    }


    addIngredientHandler = type => {
        const ingredients = [...this.state.ingredients]
        for (let item of ingredients) {
            if (item.type === type) item.amount++
        }
        this.setState({
            ingredients: ingredients
        })


    }

    removeIngredientHandler = type => {
        const ingredients = [...this.state.ingredients]
        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) {
                    return
                }
                item.amount--
            }
        }

        this.setState({
            ingredients: ingredients
        })
    }

    render() {
        return (
            <div className="row">
                <div className="col-sm-6 col-12">
                    <Burger ingredients={this.state.ingredients} />
                </div>
                <div className="col-sm-6 col-12 ">
                    <div className="pt-5" >
                        <Controls
                            added={this.addIngredientHandler}
                            remove={this.removeIngredientHandler}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default BurgerBuilder