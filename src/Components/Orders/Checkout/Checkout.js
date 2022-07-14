import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import axios from 'axios'
import Spinner from '../../Spinner/Spinner'
import { Alert, Modal, ModalBody, ModalFooter } from 'reactstrap'
import { resetIngredients } from '../../../redux/actionCreators'

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,

    }
}

const mapDisPatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients())
    }
}


export class Checkout extends Component {

    state = {
        values: {
            deliveryAddress: '',
            phone: '',
            paymentType: 'Cash On Delivery'
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: '',
        orderSuccess: false,
        alertColor: ''
    }


    onSubmitHandler = (event) => {
        this.setState({
            isLoading: true
        })
        event.preventDefault()
        const order = {
            ingredients: this.props.ingredients,
            customerInfo: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date().toISOString()
        }

        axios.post('your data base link', order)
            .then(res => {
                if (res.status === 200) {

                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: 'Order placed successfully',
                        orderSuccess: true,
                        alertColor: 'success'
                    })
                }

                this.props.resetIngredients()
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: err.message,
                    orderSuccess: false,
                    alertColor: 'warning'
                })
            })
    }

    onInputChangeHandler = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        })
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    render() {

        let form = <form
            style={{
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                padding: '20px',
                borderRadius: "12px"
            }}
            onSubmit={this.onSubmitHandler} >
            <textarea
                name="deliveryAddress"
                value={this.state.values.deliveryAddress}
                className="form-control"
                placeholder='Delivery Address'
                onChange={this.onInputChangeHandler}
            ></textarea>
            <br />
            <input
                type="number"
                name='phone'
                className="form-control"
                value={this.state.values.phone}
                placeholder="Phone number"
                onChange={this.onInputChangeHandler}
            />
            <br />
            <select
                onChange={this.onInputChangeHandler}
                name='paymentType'
                className="form-control"
                value={this.state.values.paymentType}
            >
                <option value="Cash On Delivery" > Cash on delivery </option>
                <option value="Bkash" >Bkash</option>
            </select>
            <br />
            <div className="text-end" >
                <button
                    disabled={!this.props.purchasable}
                    type='submit'
                    style={{ backgroundColor: '#D70F64', color: '#fff' }} className="btn m-1">
                    Place Order
                </button>
                <NavLink to="/"
                    className="btn btn-secondary m-1">
                    Cancel
                </NavLink>
            </div>

        </form>




        return (
            <div className="p-md-5 pt-5 p-2" >
                <h4 style={{
                    border: "1px solid grey",
                    boxShadow: "1px 1px #888888",
                    padding: '20px',
                    borderRadius: "12px"
                }}
                >Payment: {this.props.totalPrice}/- BDT </h4>

                {
                    this.state.isLoading ? <Spinner /> : form
                }

                <Modal isOpen={this.state.isModalOpen} >
                    <ModalBody>
                        <Alert color={this.state.alertColor} > <p>{this.state.modalMsg}</p> </Alert>
                    </ModalBody>
                    <ModalFooter>
                        {
                            this.state.orderSuccess === false ?
                                <button className="btn btn-warning" onClick={this.toggleModal} >
                                    Try Again
                                </button>
                                : ''
                        }

                        {
                            this.state.orderSuccess ?
                                <NavLink className="btn btn-success" to="/" >
                                    Order Again
                                </NavLink>
                                : ''
                        }

                    </ModalFooter>
                </Modal>

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDisPatchToProps)(Checkout)