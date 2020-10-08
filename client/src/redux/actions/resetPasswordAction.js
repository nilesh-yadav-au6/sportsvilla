import { RESET_PASSWORD, TOGGLE_RESET_PASSWORD_STATE } from '../actionType'
import axios from 'axios'

export const resetPasswordUser = (user) => async (dispatch) => {
    try{
        dispatch({ type: RESET_PASSWORD, payload: null })
        dispatch({ type: TOGGLE_RESET_PASSWORD_STATE})
        const {data} = await axios.post(
            `/reset/${user.resetToken}`, {newPassword: user.newPassword, confirmPassword: user.confirmPassword}
        )
        console.log(data)
        dispatch({ type: RESET_PASSWORD, payload: data })
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type: TOGGLE_RESET_PASSWORD_STATE })
    }
}