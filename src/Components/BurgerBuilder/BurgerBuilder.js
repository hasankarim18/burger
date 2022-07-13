import React, { Component } from 'react'
import { ModalBody, ModalHeader, Button, Modal, ModalFooter } from 'reactstrap'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls '
import Summary from './Summary/Summary'


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
        totalPrice: 80,
        modalOpen: false,
        purchasable: false
    }


    updatePurchasable = ingredients => {
        const sum = ingredients.reduce((sum, element) => {
            return sum + element.amount
        }, 0)
        this.setState({
            purchasable: sum > 0
        })
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

        this.updatePurchasable(ingredients)
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

        this.updatePurchasable(ingredients)
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }



    render() {
        return (
            <div>
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
                                toggleModal={this.toggleModal}
                                purchasable={this.state.purchasable}
                            />
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Your Order Summary
                    </ModalHeader>
                    <ModalBody>
                        <Summary ingredients={this.state.ingredients} />
                        <h5>Total Price: {this.state.totalPrice.toFixed(0)}/- BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" > Continue to checkout </Button>
                        <Button color="secondary" onClick={this.toggleModal} > Cancle </Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}

export default BurgerBuilder