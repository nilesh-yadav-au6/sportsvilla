import axios from 'axios'
import { GET_HOF , TOGGLE_HOF ,SINGLE_HOF_PLAYER_FETCH ,TOGGLE_HOF_PLAYER_STATE, GET_TODAY_MATCH, TOGGLE_GET_TODAY_MATCH } from '../actionType'
import { NotificationManager } from 'react-notifications';


export const getHOFALL = (page,size) => async (dispatch) => {
    try{
        dispatch({ type: GET_HOF, payload: null })
        dispatch({ type:  TOGGLE_HOF })
        const { data } = await axios(
            `/all/playerHOF?${page}&size=${size}`
        )
        
        dispatch({ type: GET_HOF, payload: data.players })
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_HOF })
    }
}

export const getCurrentMatch = () => async (dispatch) => {
    const d = new Date()
    const y = d.getFullYear()
    const m = d.getMonth()+1
    let temp
    m<10?(temp="0"+m):(temp = m)
    const dat = y+"-"+temp+"-"+d.getDate()
    console.log(dat)
    try{
        dispatch({ type: GET_TODAY_MATCH, payload: [] })
        dispatch({ type:  TOGGLE_GET_TODAY_MATCH })
        const { data } = await axios(
            `/todayMatch/${dat}`
        )
        console.log(data, "current Match")
        dispatch({ type: GET_TODAY_MATCH, payload: data.schedule })
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_GET_TODAY_MATCH })
    }
}

export const singleHofPlayer = (playerId) => async (dispatch) => {
    console.log(playerId)
    try{
        dispatch({ type: SINGLE_HOF_PLAYER_FETCH, payload: null })
        dispatch({ type:  TOGGLE_HOF_PLAYER_STATE })
        const { data } = await axios(
            `/single/playerHOF/${playerId}`
        )
        console.log(data)
        dispatch({ type: SINGLE_HOF_PLAYER_FETCH, payload: data.player})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_HOF_PLAYER_STATE })
    }
}


export const addPlayerHOF = ( player ) => async (dispatch, getState) => {
    try{
        const {name, dob, country, battingStyle, bowlingStyle, speciality,debut, testRuns, odiRuns, inducted , career, playerBio,hundreds, image} = player
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('name', name)
        fData.append('dob', dob)
        fData.append('country', country)
        fData.append('battingStyle', battingStyle)
        fData.append('bowlingStyle', bowlingStyle)
        fData.append('speciality', speciality)
        fData.append('image', image)
        fData.append('debut', debut)
        fData.append('testRuns', testRuns)
        fData.append('odiRuns', odiRuns)
        fData.append('inducted', inducted)
        fData.append('career', career)
        fData.append('playerBio', playerBio)
        fData.append('hundreds', hundreds)
        const {data} = await axios.post(
            `/add/playerHOF`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
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


export const deleteHOFPlayer = (hofplayerId) => async (dispatch,getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const { data } = await axios.delete(
            `/delete/playerHOF/${hofplayerId}`,{
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

export const updatePlayerHOF = ( player , playerId  ) => async (dispatch, getState) => {
    try{
        const {name, dob, country, battingStyle, bowlingStyle, speciality,debut, testRuns, odiRuns, inducted , career, playerBio,hundreds, image} = player
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('name', name)
        fData.append('dob', dob)
        fData.append('country', country)
        fData.append('battingStyle', battingStyle)
        fData.append('bowlingStyle', bowlingStyle)
        fData.append('speciality', speciality)
        fData.append('image', image)
        fData.append('debut', debut)
        fData.append('testRuns', testRuns)
        fData.append('odiRuns', odiRuns)
        fData.append('inducted', inducted)
        fData.append('career', career)
        fData.append('playerBio', playerBio)
        fData.append('hundreds', hundreds)
        const {data} = await axios.patch(
            `/update/playerHOF/${playerId}`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Product updated successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}
