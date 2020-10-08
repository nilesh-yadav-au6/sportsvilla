import { ADD_CART, TOGGLE_ADD_CART_STATE, GET_CART, TOGGLE_GET_CART_STATE } from '../actionType'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const addCartAction = (productId) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        dispatch({ type: ADD_CART, payload: null, })
        dispatch({ type: TOGGLE_ADD_CART_STATE })
        console.log(productId)
        const {data} = await axios.post(
            `/add/cart/${productId}`, {},{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
            NotificationManager.success('Product added to cart successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.info(data.message, 'Sports-Villa')
        }
        console.log(data)
        dispatch({ type: ADD_CART, payload: data })
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type: TOGGLE_ADD_CART_STATE })
    }
}


export const getCartAction = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        console.log(accessToken)
        dispatch({ type: GET_CART, payload: [], price: null, itemT: null })
        dispatch({ type: TOGGLE_GET_CART_STATE })
        const {data} = await axios(
            `/get/cart`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        let price = 0
        let itemT = 0
        for(let i=0; i<data.message.length; i++){
            itemT = itemT + data.message[i].quantity
            price = price + data.message[i].orderTotal
        }
        console.log(data, price, itemT)
        dispatch({ type: GET_CART, payload: data.message , price , itemT  })
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type: TOGGLE_GET_CART_STATE })
    }
}

export const removeCartAction = ( productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.delete(
            `/remove/cart/${productId}`,{
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

export const incrementCartAction = ( productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.post(
            `/increaseQuantity/${productId}`,{},{
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

export const decrementCartAction = ( productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.post(
            `/decrementQuantity/${productId}`,{},{
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