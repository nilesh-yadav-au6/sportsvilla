import { PLAYER_FETCH ,TOGGLE_PLAYER_STATE , SINGLE_PLAYER_FETCH} from '../actionType'

const initialState = {
    players: [],
    singlePlayer:null,
    isAuthenticating: false,
    count: null,
    page: 1
}

const playerReducers = (state = initialState, action) => {
    const { type, payload, count, page } = action
    switch(type){
        case  PLAYER_FETCH:
            return {...state, players: payload, count, page}
        case  SINGLE_PLAYER_FETCH:
            return {...state, singlePlayer: payload}
        case TOGGLE_PLAYER_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default playerReducers