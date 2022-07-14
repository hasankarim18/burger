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
    prices: INGREDIENT_PRICES,
    orderList: [],
    orderLoadingFailed: false,
    orderLoading: true,
    orderPlacing: true,
    placeOrder: false,
    placeOrderFailed: false,
    token: null,
    userId: null,
    authLoading: false,
    authFailedMsg: null

}

export const Reducer = (state = initialState, action) => {
    // Add ingredients
    const addIngredients = [...state.ingredients]
    switch (action.type) {
        case actionTypes.AUTH_LOADING:
            return {
                ...state,
                authLoading: action.payload
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                userId: action.payload.userId,
                token: action.payload.token
            }
        case actionTypes.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null
            }
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
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'meat', amount: 0 },
                    { type: 'cheese', amount: 0 }
                ],
                totalPrice: 80,
                purchasable: false,
                prices: INGREDIENT_PRICES
            }

        case actionTypes.LOAD_ORDERS:
            const orders = []

            for (let key in action.payload) {
                orders.push({
                    ...action.payload[key],
                    id: key
                })
            }

            return {
                ...state,
                orderList: orders,
                orderLoadingFailed: false,
                orderLoading: false
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderLoadingFailed: true,
                orderLoading: false
            }
        // place order

        case actionTypes.PLACE_ORDER:

            return {
                ...state,
                orderPlacing: false,
                placeOrder: true,
                placeOrderFailed: false
            }
        case actionTypes.PLACING_ORDER:
            return {
                ...state,
                orderPlacing: true,
                placeOrder: false,
                placeOrderFailed: false
            }
        case actionTypes.PLACE_ORDER_FAILED:
            return {
                ...state,
                orderPlacing: false,
                placeOrder: false,
                placeOrderFailed: true
            }

        default:
            return state
    }
}