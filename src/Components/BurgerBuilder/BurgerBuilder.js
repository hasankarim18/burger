import React, { Component } from 'react'
import { ModalBody, ModalHeader, Button, Modal, ModalFooter } from 'reactstrap'
import Burger from './Burger/Burger'
import Controls from './Controls/Controls '
import Summary from './Summary/Summary'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { addIngreDient, removeIngredient, updatePurchasable } from '../../redux/actionCreators'



const mapStateToProps = state => {

    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
        prices: state.prices
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        addIngreDient: (type) => dispatch(addIngreDient(type)),
        removeIngredient: (type) => dispatch(removeIngredient(type)),
        updatePurchasable: () => dispatch(updatePurchasable())
    }
}




export class BurgerBuilder extends Component {

    state = {
        modalOpen: false,
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
        this.props.addIngreDient(type)


        this.props.updatePurchasable(this.props.ingredients)
    }

    removeIngredientHandler = type => {
        this.props.removeIngredient(type)

        this.props.updatePurchasable(this.props.ingredients)
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <Burger ingredients={this.props.ingredients} />
                    </div>
                    <div className="col-sm-6 col-12 ">
                        <div className="pt-5" >
                            <Controls
                                price={this.props.totalPrice}
                                added={this.addIngredientHandler}
                                remove={this.removeIngredientHandler}
                                toggleModal={this.toggleModal}
                                purchasable={this.props.purchasable}
                            />
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader>
                        Your Order Summary
                    </ModalHeader>
                    <ModalBody>
                        <Summary ingredients={this.props.ingredients} />
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)}/- BDT</h5>
                    </ModalBody>
                    <ModalFooter>
                        <NavLink className="btn btn-success" to="/checkout" > Continue to checkout </NavLink>
                        <Button color="secondary" onClick={this.toggleModal} > Cancle </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(BurgerBuilder)