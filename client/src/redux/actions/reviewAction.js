import { GET_RREVIEW ,TOGGLE_REVIEW } from "../actionType"
import axios from "axios"
// import { NotificationManager } from 'react-notifications';

export const getReviews = (productId) => async (dispatch) => {
    console.log(productId)
    try{
        dispatch({ type: GET_RREVIEW, payload: null })
        dispatch({ type:  TOGGLE_REVIEW })
        const { data } = await axios(
            `/getreview/${productId}`
        )
        dispatch({ type: GET_RREVIEW, payload: data.review.reverse()})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_REVIEW })
    }
}

export const addReview = ( review ,productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        console.log(review)
        const {data} = await axios.post(
            `/add/review/${productId}`,{review:review},{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}