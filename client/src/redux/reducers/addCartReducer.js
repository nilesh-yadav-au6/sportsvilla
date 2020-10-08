import { ADD_CART, TOGGLE_ADD_CART_STATE } from '../actionType'

const initialState = {
    cart: null,
    isFetching: false,
}

const addcartReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case ADD_CART:
            return {...state, cart: payload}
        case TOGGLE_ADD_CART_STATE:
            return { ...state, isFetching: !state.isFetching }
        default:
            return state
    }
}

export default addcartReducer