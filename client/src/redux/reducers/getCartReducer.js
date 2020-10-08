import { GET_CART, TOGGLE_GET_CART_STATE } from '../actionType'

const initialState = {
    cart: [],
    isFetching: false,
    price: null,
    itemT: null
}

const getcartReducer = (state = initialState, action) => {
    const { type, payload, price, itemT } = action
    switch(type){
        case GET_CART:
            return {...state, cart: [...payload], price, itemT}
        case TOGGLE_GET_CART_STATE:
            return { ...state, isFetching: !state.isFetching }
        default:
            return state
    }
}

export default getcartReducer