import { SET_PENDING, TOGGLE_SET_PENDING_STATE } from '../actionType'
import axios from 'axios'

export const getPendingOrd = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        dispatch({ type: SET_PENDING, payload: null, })
        dispatch({ type: TOGGLE_SET_PENDING_STATE })
        const {data} = await axios(
            `/allPendingOrder`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        dispatch({ type: SET_PENDING, payload: data.order })
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type: TOGGLE_SET_PENDING_STATE })
    }
}