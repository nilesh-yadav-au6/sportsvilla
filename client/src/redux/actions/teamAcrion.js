import { TEAM_FETCH , TOGGLE_TEAM_STATE ,SINGLE_TEAM_FETCH}  from "../actionType"
import axios from 'axios'

export const fetchTeam = (page, size) => async (dispatch) => {
    try{
        dispatch({ type: TEAM_FETCH, payload: [] })
        dispatch({ type:  TOGGLE_TEAM_STATE })
        const { data } = await axios(
            `/all/management?page=${page}&size=${size}`
        )
        console.log(data)
        dispatch({ type: TEAM_FETCH, payload: data.management, count: data.count, page})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_TEAM_STATE })
    }
}


export const singleTeam = (teamId) => async (dispatch) => {
    try{
        dispatch({ type: SINGLE_TEAM_FETCH, payload: null, players: [] })
        dispatch({ type:  TOGGLE_TEAM_STATE })
        const { data } = await axios(
            `/single/management/${teamId}`
        )
        console.log(data)
        dispatch({ type: SINGLE_TEAM_FETCH, payload: data.management, players: data.players})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_TEAM_STATE })
    }
}
