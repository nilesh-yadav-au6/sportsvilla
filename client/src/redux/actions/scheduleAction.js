import { SCHEDULE_FETCH ,TOGGLE_SCHEDULE_STATE ,SINGLE_SCHEDULE_FETCH }  from "../actionType"
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const fetchSchdule = (page, size) => async (dispatch) => {
    try{
        dispatch({ type: SCHEDULE_FETCH, payload: null })
        dispatch({ type: TOGGLE_SCHEDULE_STATE })
        const { data } = await axios(
            `/all/schedule?page=${page}&size=${size}`
        )
        console.log(data)
        dispatch({ type: SCHEDULE_FETCH, payload: data.schedule, count: data.count, page })
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_SCHEDULE_STATE })
    }
}


export const fetchSearchSchdule = (page, size, date) => async (dispatch) => {
    try{
        dispatch({ type: SCHEDULE_FETCH, payload: null })
        dispatch({ type: TOGGLE_SCHEDULE_STATE })
        const { data } = await axios(
            `/searchDate?page=${page}&size=${size}&matchDate=${date}`
        )
        console.log(data)
        dispatch({ type: SCHEDULE_FETCH, payload: data.schedule, count: data.count, page })
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_SCHEDULE_STATE })
    }
}

export const singleSchedule = (productId) => async (dispatch) => {
    console.log(productId)
    try{
        dispatch({ type: SINGLE_SCHEDULE_FETCH, payload: null })
        dispatch({ type:  TOGGLE_SCHEDULE_STATE })
        const { data } = await axios(
            `/singleschedule/${productId}`
        )
        dispatch({ type: SINGLE_SCHEDULE_FETCH, payload: data.schedule})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_SCHEDULE_STATE })
    }
}


export const addScheduleAdminAction = ( schedule ) => async (dispatch, getState) => {
    try{
        const { matchType, matchDate, matchPlace, team1, team2, capacity, image, price } = schedule
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('matchType', matchType)
        fData.append('matchDate', matchDate)
        fData.append('matchPlace', matchPlace)
        fData.append('team1', team1)
        fData.append('team2', team2)
        fData.append('capacity', capacity)
        fData.append('price', price)
        for (const key of Object.keys(image)) {
            fData.append('image', image[key])
        }
        const {data} = await axios.post(
            `/add/schedule`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
            NotificationManager.success('Schedule added successfully', 'Success')
        }
        else if(data.statusCode === 400||data.statusCode===401){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const updateScheduleAdminAction = ( schedule ) => async (dispatch, getState) => {
    try{
        const { matchType, matchDate, matchPlace, team1, team2, capacity, image, price, productId } = schedule
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('matchType', matchType)
        fData.append('matchDate', matchDate)
        fData.append('matchPlace', matchPlace)
        fData.append('team1', team1)
        fData.append('team2', team2)
        fData.append('capacity', capacity)
        fData.append('price', price)
        for (const key of Object.keys(image)) {
            fData.append('image', image[key])
        }
        const {data} = await axios.patch(
            `/update/schedule/${productId}`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Schedule updated successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const deleteScheduleAdmin = ( productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.delete(
            `/delete/schedule/${productId}`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Schedule deleted successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}
