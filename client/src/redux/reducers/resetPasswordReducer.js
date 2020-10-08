import { RESET_PASSWORD, TOGGLE_RESET_PASSWORD_STATE } from '../actionType'

const initialState = {
    email: null,
    isAuthenticating: false,
}

const resetPasswordReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case RESET_PASSWORD:
            return {...state, email: payload}
        case TOGGLE_RESET_PASSWORD_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default resetPasswordReducer