import { GET_USER, TOGGLE_LOGIN_STATE, LOGOUT_USER } from '../actionType'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticating: false,
    error: null,
}

const userReducer = (state = initialState, action) => {
    const { type, payload, error } = action
    switch(type){
        case GET_USER:
            const userJSON = JSON.stringify(payload)
            localStorage.setItem('user', userJSON)
            return {...state, user: payload, error: error}
        case TOGGLE_LOGIN_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        case LOGOUT_USER:
            localStorage.removeItem('user')
            return {...state, user: null, error: error}
        default:
            return state
    }
}

export default userReducer