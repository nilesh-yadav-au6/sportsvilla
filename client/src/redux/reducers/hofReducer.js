import {GET_HOF ,TOGGLE_HOF , SINGLE_HOF_PLAYER_FETCH , TOGGLE_HOF_PLAYER_STATE, GET_TODAY_MATCH, TOGGLE_GET_TODAY_MATCH} from '../actionType'

const initialState = {
    hofPlayers : [],
    singleHofPlayer:{},
    isAuthenticating:false,
    currentMatch: [],
    isFetching: false
}

const hofPlayerReducers = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case  GET_HOF:
            return {...state, hofPlayers: payload }
        case  SINGLE_HOF_PLAYER_FETCH:
            return {...state, singleHofPlayer: payload}
        case TOGGLE_HOF:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        case TOGGLE_HOF_PLAYER_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        case GET_TODAY_MATCH:
            return {...state, currentMatch: payload}
        case TOGGLE_GET_TODAY_MATCH:
            return {...state, isFetching: !state.isFetching}
        default:
            return state
    }
}

export default hofPlayerReducers