import {GET_RREVIEW , TOGGLE_REVIEW} from '../actionType'

const initialState = {
    reviews: [],
    isAuthenticating: false,
}

const reviewReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case GET_RREVIEW:
            console.log(payload)
            return {...state, reviews: payload}
        case TOGGLE_REVIEW:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default reviewReducers