import React, { Component } from 'react'
import { fetchOrders } from '../../redux/actionCreators'
import { connect } from 'react-redux'
import Order from './order/Order'
import Spinner from '../Spinner/Spinner'
import { Alert } from 'reactstrap'

const mapStateToProps = state => {
    return {
        orderList: state.orderList,
        orderLoadingFailed: state.orderLoadingFailed,
        orderLoading: state.orderLoading
    }
}

const mapDisPatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}



export class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders()



    }
    componentDidUpdate() {
        console.log(this.props.orderLoadingFailed)
    }

    render() {
        let orders = null
        // if (this.props.orderList.length === 0) {
        //     orders = <Alert> No rders to show </Alert>
        // } else if (this.props.orderLoadingFailed === true) {
        //     orders = <Alert color="warning" > Something went wrong! </Alert>
        // }
        // else {
        //     orders = this.props.orderList.map(item => {
        //         return <Order
        //             order={item}
        //             key={item.id}
        //         />
        //     })
        // }


        if (this.props.orderLoadingFailed === true) {
            orders = <Alert color="warning" > Something went wrong! </Alert>
        } else if (this.props.orderLoadingFailed === false) {
            if (this.props.orderList.length === 0) {
                orders = <Alert> No rders to show </Alert>
            } else {
                orders = this.props.orderList.map(item => {
                    return <Order
                        order={item}
                        key={item.id}
                    />
                })
            }
        }

        return (
            <div className="pt-5" >
                {
                    this.props.orderLoading ?
                        <Spinner />
                        :
                        orders
                }

            </div>
        )
    }
}



export default connect(mapStateToProps, mapDisPatchToProps)(Orders)