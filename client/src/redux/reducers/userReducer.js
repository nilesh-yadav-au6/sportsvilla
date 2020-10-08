import { EDIT_USER ,TOGGLE_EDIT_USER ,GET_ORDERS } from '../actionType'

const initialState = {
    user: null,
    orders:null,
    isAuthenticating: false,
}

const userReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case EDIT_USER:
            console.log(payload, 1234567)
            return {...state, user: payload}
        case GET_ORDERS:
            console.log(payload)
            return {...state, orders: payload}
        case TOGGLE_EDIT_USER:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default userReducer