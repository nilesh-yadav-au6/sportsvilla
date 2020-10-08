import { CONFIRM_EMAIL, TOGGLE_CONFIRM_EMAIL_STATE } from '../actionType'
import axios from 'axios'

export const ConfirmUSer = (token) => async (dispatch) => {
    try{
        dispatch({ type: CONFIRM_EMAIL, payload: null })
        dispatch({ type: TOGGLE_CONFIRM_EMAIL_STATE})
        const {data} = await axios(
            `/confirm/${token}`
        )
        dispatch({ type: CONFIRM_EMAIL, payload: data })
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_CONFIRM_EMAIL_STATE })
    }
}