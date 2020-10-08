import { PLAYER_FETCH , TOGGLE_PLAYER_STATE ,SINGLE_PLAYER_FETCH}  from "../actionType"
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const fetchPlayers = (page, size) => async (dispatch) => {
    try{
        dispatch({ type: PLAYER_FETCH, payload: [] })
        dispatch({ type:  TOGGLE_PLAYER_STATE })
        const { data } = await axios(
            `/all/player?page=${page}&size=${size}`
        )
        console.log(data)
        dispatch({ type: PLAYER_FETCH, payload: data.players, count: data.count, page: page})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_PLAYER_STATE })
    }
}

export const singlePlayer = (playerId) => async (dispatch) => {
    try{
        dispatch({ type: SINGLE_PLAYER_FETCH, payload: null })
        dispatch({ type:  TOGGLE_PLAYER_STATE })
        const { data } = await axios(
            `/single/player/${playerId}`
        )
        console.log(data)
        dispatch({ type: SINGLE_PLAYER_FETCH, payload: data.player})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_PLAYER_STATE })
    }
}

export const deletePlayerAdmin = ( playerId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.delete(
            `/delete/player/${playerId}`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Player deleted successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const updatePlayerAdminAction = ( player ) => async (dispatch, getState) => {
    try{
        const {name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, description, image, playerId} = player
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('name', name)
        fData.append('age', age)
        fData.append('country', country)
        fData.append('battingStyle', battingStyle)
        fData.append('bowlingStyle', bowlingStyle)
        fData.append('speciality', speciality)
        fData.append('basePrice', basePrice)
        fData.append('soldPrice', soldPrice)
        fData.append('soldTeam', soldTeam)
        fData.append('description', description)
        fData.append('image', image)
        const {data} = await axios.patch(
            `/update/player/${playerId}`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Player updated successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}