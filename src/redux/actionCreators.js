import * as actionTypes from './actionTypes'
import axios from 'axios'
import { url } from './url'




export const addIngreDient = type => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: type
    }
}


export const removeIngredient = type => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: type
    }
}


export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE
    }
}




export const loadOrders = (order) => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: order
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED
    }
}

const orderLoading = () => {
    return {
        type: actionTypes.ORDER_LOADING
    }
}

export const fetchOrders = (token) => dispatch => {

    dispatch(orderLoading())

    axios.get(url + '/burger.json?auth=' + token)
        .then(res => res.data)
        .then(data => {

            dispatch(loadOrders(data))
        })
        .catch(err => {
            console.log('orderloading failed')
            dispatch(orderLoadFailed())
        })
}


const placeOrder = () => {
    return {
        type: actionTypes.PLACE_ORDER,
    }
}

const placeingOrder = () => {
    return {
        type: actionTypes.PLACING_ORDER
    }
}

const placeOrderFailed = () => {
    return {
        type: actionTypes.PLACE_ORDER_FAILED
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
    }
}

export const submitOrderTo = (order) => dispatch => {
    dispatch(placeingOrder())

    axios.post(url + '/burger.json', order)
        .then(res => {
            console.log(res)
            if (res.status === 200) {
                dispatch(placeOrder())
                dispatch(resetIngredients())
            } else {
                dispatch(placeOrderFailed())
            }
        })
        .catch(err => {

            dispatch(placeOrderFailed())
        })
}