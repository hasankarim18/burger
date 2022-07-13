import * as actionTypes from './actionTypes'

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90
}



const initialState = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'meat', amount: 0 },
        { type: 'cheese', amount: 0 }
    ],
    totalPrice: 80,
    purchasable: false,
    prices: INGREDIENT_PRICES
}

export const Reducer = (state = initialState, action) => {
    // Add ingredients
    const addIngredients = [...state.ingredients]
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:

            const newPrice = state.totalPrice + state.prices[action.payload]

            for (let item of addIngredients) {
                if (item.type === action.payload) {
                    item.amount++
                }
            }

            return {
                ...state,
                ingredients: addIngredients,
                totalPrice: newPrice
            }
        case actionTypes.REMOVE_INGREDIENT:

            const removeIngredients = [...state.ingredients]
            const removedPrice = state.totalPrice - state.prices[action.payload]

            for (let item of removeIngredients) {
                if (item.type === action.payload) {
                    if (item.amount <= 0) return;
                    item.amount--
                }
            }
            return {
                ...state,
                ingredients: removeIngredients,
                totalPrice: removedPrice
            }

        case actionTypes.UPDATE_PURCHASABLE:
            const purState = [...state.ingredients]
            const sum = purState.reduce((sum, element) => {
                return sum + element.amount
            }, 0)

            return {
                ...state,
                purchasable: sum > 0
            }


        default:
            return state
    }
}