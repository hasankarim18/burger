import React, { useState } from 'react'
import { useFormik } from 'formik';
import { connect } from 'react-redux'
import classes from './Checkout.module.css'
import axios from 'axios';
import { Alert, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import Spinner from '../../Spinner/Spinner'
import { submitOrderTo } from '../../../redux/actionCreators';
import { NavLink } from 'react-router-dom'

const mapStateToProps = state => {
    return {
        totalPrice: state.totalPrice,
        ingredients: state.ingredients,
        purchasable: state.purchasable,
        orderPlacing: state.orderPlacing,
        placeOrder: state.placeOrder,
        placeOrderFailed: state.placeOrderFailed,
        userId: state.userId,
        token: state.token
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        submitOrderTo: (order, token) => dispatch(submitOrderTo(order, token))
    }
}

const Checkout = (props) => {

    const [modal, setModal] = useState(false)
    const [isErro, setIsError] = useState(false)

    const validate = values => {
        const errors = {}
        if (!values.deliveryAddress) {
            errors.deliveryAddress = 'Delivery Address Required'
        } else if (values.deliveryAddress.length < 20) {
            errors.deliveryAddress = 'Delivery address cant be less than 20 charecter'
        } else if (!values.phoneNumber) {
            errors.phoneNumber = 'Required'
        }

        if (JSON.stringify(errors) === '{}') {
            setIsError(true)
        } else {
            setIsError(false)
        }

        return errors
    }




    const payForm = useFormik({
        initialValues: {
            deliveryAddress: '',
            phoneNumber: '',
            paymentType: 'Cash On Delivery'
        },
        validate,
        onSubmit: values => {
            const order = {
                ingredients: props.ingredients,
                customerInfo: values,
                price: props.totalPrice,
                orderTime: new Date().toISOString(),
                userId: props.userId
            }

            props.submitOrderTo(order, props.token)
        }
    })

    const toggleModal = () => {
        setModal(!modal)
    }

    // console.log(props)

    let orderPlacingInfo = null

    if (props.orderPlacing) {
        orderPlacingInfo = <Spinner />
    } else if (props.placeOrder) {
        orderPlacingInfo = <Alert color="success"> Oreder Places successfully </Alert>
    } else if (props.placeOrderFailed) {
        orderPlacingInfo = <Alert color='warning' >Something went wrong! please try againg</Alert>
    }

    return (
        <div className="container pt-5">

            <div className="row justify-content-center">
                <div className={`col-md-8 col-sm-10 col-12 ${classes.totalPrice}`}  >
                    <h5>Payable amount: {props.totalPrice}</h5>
                </div>
                <div className={`${classes.checkout} p-0 text-start col-md-8 col-sm-10 col-12`} >

                    <form onSubmit={payForm.handleSubmit}>
                        <label htmlFor='deliveryAddress' className="text-bold" >Delivery Address</label>
                        <textarea
                            id="deliveryAddress"
                            name="deliveryAddress"
                            value={payForm.values.deliveryAddress}
                            className="form-control"
                            placeholder='Delivery Address'
                            onChange={payForm.handleChange}
                        ></textarea>
                        {payForm.errors.deliveryAddress ? <Alert color="warning"> {payForm.errors.deliveryAddress} </Alert> : ''}
                        <br />
                        <label htmlFor='phone'>Phone Number</label>
                        <input
                            className="form-control"
                            name='phoneNumber'
                            placeholder='Phone Number'
                            onChange={payForm.handleChange}
                            value={payForm.values.phoneNumber}
                            id="phone"
                            type="number" />
                        {payForm.errors.phoneNumber ? <Alert color="warning"> {payForm.errors.phoneNumber} </Alert> : ''}
                        <hr />
                        <label htmlFor='paymentType'>Payment Type</label>
                        <select
                            className="form-control"
                            type="select"
                            name='paymentType'
                            id="paymentType"
                            onChange={payForm.handleChange}
                            value={payForm.values.paymentType}
                        >
                            <option value='Cash On Delivery' >Cash On Delivery</option>
                            <option value='Bkash' >Bkash</option>
                        </select>
                        <br />
                        <div className="text-end" >
                            <button
                                disabled={!isErro}
                                type="submit"
                                onClick={toggleModal}
                                className="btn btn-success"  > Place Order </button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal isOpen={modal} >
                <ModalBody>
                    {orderPlacingInfo}
                </ModalBody>
                <ModalFooter>
                    {
                        props.placeOrder ?
                            <NavLink className="btn btn-success" to="/" >
                                Order Again
                            </NavLink>
                            : ''
                    }
                    {
                        props.placeOrderFailed ? <Button onClick={toggleModal} > Try Again </Button> : ''
                    }

                </ModalFooter>
            </Modal>
        </div>
    )
}

export default connect(mapStateToProps, mapDisPatchToProps)(Checkout)