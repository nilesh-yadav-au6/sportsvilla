import { FORGOT_EMAIL, TOGGLE_FORGOT_EMAIL_STATE } from '../actionType'

const initialState = {
    email: null,
    isAuthenticating: false,
}

const forgotEmailReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case FORGOT_EMAIL:
            return {...state, email: payload}
        case TOGGLE_FORGOT_EMAIL_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default forgotEmailReducer