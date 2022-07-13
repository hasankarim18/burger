import * as actionTypes from './actionTypes'




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