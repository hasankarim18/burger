import React, { Component } from 'react'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls '


const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90
}


export class BurgerBuilder extends Component {

    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'meat', amount: 0 },
            { type: 'cheese', amount: 0 }
        ],
        totalPrice: 80
    }


    addIngredientHandler = type => {
        const ingredients = [...this.state.ingredients]

        const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type]

        for (let item of ingredients) {
            if (item.type === type) item.amount++
        }
        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
        })


    }

    removeIngredientHandler = type => {
        const ingredients = [...this.state.ingredients]

        const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type]

        for (let item of ingredients) {
            if (item.type === type) {
                if (item.amount <= 0) {
                    return
                }
                item.amount--
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: newPrice
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
                            price={this.state.totalPrice}
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