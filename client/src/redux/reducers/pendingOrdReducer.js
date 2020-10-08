import { SET_PENDING, TOGGLE_SET_PENDING_STATE } from '../actionType'

const initialState = {
    orders: [],
    isFetching: false,
}

const pendingOrderReducer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case SET_PENDING:
            return {...state, orders: payload}
        case TOGGLE_SET_PENDING_STATE:
            return { ...state, isFetching: !state.isFetching }
        default:
            return state
    }
}

export default pendingOrderReducer