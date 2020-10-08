import {SCHEDULE_FETCH ,TOGGLE_SCHEDULE_STATE , SINGLE_SCHEDULE_FETCH} from '../actionType'

const initialState = {
    schedules: null,
    singleSchedule:null,
    isAuthenticating: false,
    count: null,
    page: 1,
}

const schduleReducers = (state = initialState, action) => {
    const { type, payload, count, page } = action
    switch(type){
        case SCHEDULE_FETCH:
            console.log(payload)
            return {...state, schedules: payload, count, page}
        case SINGLE_SCHEDULE_FETCH:
            console.log(payload)
            return {...state, singleSchedule: payload}
        case TOGGLE_SCHEDULE_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default schduleReducers