import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const addManagementAdminAction = ( schedule ) => async (dispatch, getState) => {
    try{
        const { teamName, email, personalEmail, password, manager, image } = schedule

        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('teamName', teamName)
        fData.append('email', email)
        fData.append('personalEmail', personalEmail)
        fData.append('password', password)
        fData.append('manager', manager)
        fData.append('image', image)
        const {data} = await axios.post(
            `/add/management`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
            NotificationManager.success('Team added successfully', 'Success')
        }
        else if(data.statusCode === 400||data.statusCode===401){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const deleteManagementAdmin = ( managementId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.delete(
            `/delete/management/${managementId}`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Management fired successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const updateManagementAdminAction = ( schedule ) => async (dispatch, getState) => {
    try{
        const { teamName, email, personalEmail, password, manager, image, teamId } = schedule
        console.log(schedule)
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('teamName', teamName)
        fData.append('email', email)
        fData.append('personalEmail', personalEmail)
        fData.append('password', password)
        fData.append('manager', manager)
        fData.append('image', image)
        console.log(fData)
        const {data} = await axios.patch(
            `/update/management/${teamId}`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Team updated successfully', 'Success')
        }
        else if(data.statusCode === 400||data.statusCode===401){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}