import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'


export class Checkout extends Component {

    state = {
        values: {
            deliveryAddress: '',
            phone: '',
            paymentType: 'Cash On Delivery'
        }
    }

    componentDidMount() {
        console.log(this.props)
    }

    onSubmitHandler = (event) => {
        event.preventDefault()
        console.log('values', this.state.values)
    }

    onInputChangeHandler = event => {
        this.setState({
            values: {
                ...this.state.values,
                [event.target.name]: event.target.value
            }
        })
    }

    render() {
        return (
            <div className="p-md-5 pt-5 p-2" >
                <form
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
            </div>
        )
    }
}

export default Checkout