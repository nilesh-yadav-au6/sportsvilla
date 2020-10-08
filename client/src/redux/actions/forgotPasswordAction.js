import { FORGOT_EMAIL, TOGGLE_FORGOT_EMAIL_STATE } from '../actionType'
import axios from 'axios'

export const forgotPasswordUser = (user) => async (dispatch) => {
    try{
        dispatch({ type: FORGOT_EMAIL, payload: null })
        dispatch({ type: TOGGLE_FORGOT_EMAIL_STATE})
        const {data} = await axios.post(
            `/forgot-password`, {...user}
        )
        dispatch({ type: FORGOT_EMAIL, payload: data })
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_FORGOT_EMAIL_STATE })
    }
}