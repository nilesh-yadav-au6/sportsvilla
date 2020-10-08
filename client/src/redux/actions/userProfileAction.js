import axios from 'axios'
import { EDIT_USER , TOGGLE_EDIT_USER , GET_ORDERS, GET_USER} from "../actionType"
import { NotificationManager } from 'react-notifications';

export const getUser = () => async (dispatch, getState) => {
    try{
        dispatch({ type: EDIT_USER, payload: null, })
        dispatch({type:TOGGLE_EDIT_USER})
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios(
            `/user/profile`,{
                headers:{
                    Authorization : accessToken
                }
            }
            )
            console.log(data)
            dispatch({ type: EDIT_USER ,payload:data.user })
    }catch(err){
        console.error(err.message);
    }finally {
        dispatch({ type: TOGGLE_EDIT_USER })
    }
}

export const editUserProfile = ( detaills ) => async (dispatch, getState) => {
    try{
        const { name, image } = detaills
        const user = getState().loginState.user
        const accessToken = getState().loginState.user.data.accessToken
        const formData = new FormData()
        if(name !== undefined){
            formData.append('name', name)
        }
        formData.append('image', image)
        const {data} = await axios.patch(
            `/edit/userprofile`,formData,{
                headers:{
                    Authorization : accessToken
                }
            }
            )
            if(data.statusCode === 200){
                NotificationManager.success('Profile updated successfully', 'Success')
            }
            console.log(data, 'edit')
            user.data.commenUser.profilePic = data.message.profilePic
            dispatch({ type: EDIT_USER ,payload:data.message })
            dispatch({ type: GET_USER, payload: user, error: null })
    }catch(err){
        console.error(err.message);
    }
}

export const getUserOrder = () => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        console.log(accessToken)
        dispatch({ type: GET_ORDERS, payload: [], price: null, itemT: null })
        dispatch({ type: TOGGLE_EDIT_USER })
        const {data} = await axios(
            `/get/orders`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        console.log(data)
        dispatch({ type: GET_ORDERS, payload: data.userOrders})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type: TOGGLE_EDIT_USER })
    }
}


export const changePassword = ( detaills ) => async (dispatch, getState) => {
    try{
        const { email ,newPassword , oldPassword } = detaills
        const maindata = { email ,newPassword , oldPassword }
        console.log(email ,oldPassword ,newPassword)    
        const accessToken = getState().loginState.user.data.accessToken
        console.log(accessToken)
        const fData = new FormData()
        fData.append('email', email)
        fData.append('newPassword', newPassword)
        fData.append('oldPassword', oldPassword)
        console.log(fData)
        const {data} = await axios.post(
            `/change-password`,maindata,{
                headers:{
                    Authorization : accessToken
                }
            }
            )
            if(data.statusCode === 200){
                NotificationManager.success('Profile updated successfully', 'Success')
            }
            console.log(data)
        }catch(err){
            NotificationManager.error('Bad Request', 'Error')
            console.error(err.message);
    }
}
