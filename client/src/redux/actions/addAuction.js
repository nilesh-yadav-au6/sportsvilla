import axios from 'axios'
import { TOGGLE_CUR_AUCTION_PLAYER } from '../actionType'
export const createAuction = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.patch(
            `/update/auction`, {}, {
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

export const closeAuction = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.patch(
            `/close/auction`, {}, {
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

export const playerAuction = (playerId) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        console.log(playerId, 951753)
        const {data} = await axios.patch(
            `/updatetrueAuction/${playerId}`, {}, {
                headers:{
                    Authorization : accessToken
                }
            }
        )
        console.log(data)
        // dispatch({ type: CUR_AUCTION_PLAYER, payload: data })
        dispatch({ type: TOGGLE_CUR_AUCTION_PLAYER })
    }catch(err){
        console.error(err.message);
    }
}
export const playerFalseAuction = (playerId) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        console.log(playerId, 951753)
        const {data} = await axios.patch(
            `/updatefalseAuction/${playerId}`, {}, {
                headers:{
                    Authorization : accessToken
                }
            }
        )
        console.log(data)
        // dispatch({ type: CUR_AUCTION_PLAYER, payload: data })
        dispatch({ type: TOGGLE_CUR_AUCTION_PLAYER })
    }catch(err){
        console.error(err.message);
    }
}