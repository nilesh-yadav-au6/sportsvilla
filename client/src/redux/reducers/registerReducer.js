import { SET_USER, TOGGLE_AUTH_STATE } from '../actionType'

const initialState = {
    user: null,
    isAuthenticating: false,
    error: []
}

const userReducer = (state = initialState, action) => {
    const { type, payload, error } = action
    switch(type){
        case SET_USER:
            return {...state, user: payload, error: error}
        case TOGGLE_AUTH_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default userReducer