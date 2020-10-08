import { CONFIRM_EMAIL, TOGGLE_CONFIRM_EMAIL_STATE } from '../actionType'

const initialState = {
    email: null,
    isAuthenticating: false,
}

const confrimEmailReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case CONFIRM_EMAIL:
            return {...state, email: payload}
        case TOGGLE_CONFIRM_EMAIL_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default confrimEmailReducer