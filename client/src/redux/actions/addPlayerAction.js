import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const addPlayerAdminAction = ( player ) => async (dispatch, getState) => {
    try{
        const {name, age, country, battingStyle, bowlingStyle, speciality, basePrice, soldPrice, soldTeam, description, image} = player
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('name', name)
        fData.append('age', age)
        fData.append('country', country)
        fData.append('battingStyle', battingStyle)
        fData.append('bowlingStyle', bowlingStyle)
        fData.append('speciality', speciality)
        fData.append('basePrice', basePrice)
        fData.append('soldPrice', soldPrice)
        fData.append('soldTeam', soldTeam)
        fData.append('description', description)
        fData.append('image', image)
        const {data} = await axios.post(
            `/add/player`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
            NotificationManager.success('Player added successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}