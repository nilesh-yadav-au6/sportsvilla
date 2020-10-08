import { SET_USER, TOGGLE_AUTH_STATE, LOGOUT_USER } from '../actionType'
import axios from 'axios'

export const fetchUser = (user) => async (dispatch) => {
    try{
        dispatch({ type: SET_USER, payload: null, error: [] })
        dispatch({ type: TOGGLE_AUTH_STATE })
        const { data } = await axios.post(
            `/user/register`,{ ...user }
        )
        if(data.statusCode === 400 && Array.isArray(data.message)){
            dispatch({type: SET_USER, payload: null, error: data.message})
        }
        else if(data.statusCode === 201){
            dispatch({ type: SET_USER, payload: data, error: [] })
        }
        else if(data.statusCode === 401) {
            dispatch({ type: SET_USER, payload: null, error: [data] })
        }
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_AUTH_STATE })
    }
}

export const logOutUser = () => async (dispatch) => {
    try{
        dispatch({type: LOGOUT_USER})
    }catch(err){
        console.error(err)
    }
}