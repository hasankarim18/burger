import * as actionTypes from './actionTypes'
import axios from 'axios'




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


export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS
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

export const fetchOrders = () => dispatch => {

    dispatch(orderLoading())

    axios.get('your data base link')
        .then(res => res.data)
        .then(data => {
            dispatch(loadOrders(data))
        })
        .catch(err => {
            console.log('orderloading failed')
            dispatch(orderLoadFailed())
        })
}