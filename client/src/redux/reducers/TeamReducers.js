import { TEAM_FETCH ,TOGGLE_TEAM_STATE , SINGLE_TEAM_FETCH} from '../actionType'

const initialState = {
    teams: [],
    singleTeam: {},
    players: [],
    isAuthenticating: false,
    count: null,
    page: 1,
}

const teamReducers = (state = initialState, action) => {
    const { type, payload, count, page, players } = action
    switch(type){
        case  TEAM_FETCH:
            return {...state, teams: payload, count, page}
        case  SINGLE_TEAM_FETCH:
            return {...state, singleTeam: {...payload}, players}
        case TOGGLE_TEAM_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default teamReducers