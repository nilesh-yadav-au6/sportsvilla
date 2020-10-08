import { PRODUCT_FETCH , TOGGLE_PRODUCT_STATE ,SINGLE_PRODUCT_FETCH}  from "../actionType"
import axios from 'axios'
import { NotificationManager } from 'react-notifications';

export const fetchProduct = (page, size, sort, amount=999999999) => async (dispatch) => {
    console.log(amount, "FromHere")
    try{
        dispatch({ type: PRODUCT_FETCH, payload: null })
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
        const { data } = await axios(
            `/all/product?page=${page}&size=${size}&sort=${sort}&amount=${amount}`
        )
        console.log(data)
        dispatch({ type: PRODUCT_FETCH, payload: data.product, count: data.count, page})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
    }
}

export const fetchBatProduct = (page, size, category, sort, amount) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_FETCH, payload: null })
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
        const { data } = await axios(
            `/product/category?page=${page}&size=${size}&category=${category}&sort=${sort}&amount=${amount}`
        )
        console.log(data)
        dispatch({ type: PRODUCT_FETCH, payload: data.product, count: data.count, page})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
    }
}

export const fetchFuzzySearchProduct = (page, size, product, sort, amount) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_FETCH, payload: null })
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
        const { data } = await axios(
            `/searchproduct?page=${page}&size=${size}&product=${product}&sort=${sort}&amount=${amount}`
        )
        console.log(data)
        dispatch({ type: PRODUCT_FETCH, payload: data.product, count: data.count, page})
    }catch(err){
        console.error(err.message);
    } finally {
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
    }
}
export const singleProduct = (productId) => async (dispatch) => {
    console.log(productId)
    try{
        dispatch({ type: SINGLE_PRODUCT_FETCH, payload: null })
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
        const { data } = await axios(
            `/single/product?id=${productId}`
        )
        console.log(data)
        dispatch({ type: SINGLE_PRODUCT_FETCH, payload: data.product})
    }catch(err){
        console.error(err);
    } finally {
        dispatch({ type:  TOGGLE_PRODUCT_STATE })
    }
}

export const addProductAdminAction = ( product ) => async (dispatch, getState) => {
    try{
        const { productName, brand, category, price, image } = product
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('productName', productName)
        fData.append('brand', brand)
        fData.append('category', category)
        fData.append('price', price)
        fData.append('image', image)
        const {data} = await axios.post(
            `/add/product`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 201){
            NotificationManager.success('Product added successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const deleteProductAdmin = ( productId ) => async (dispatch, getState) => {
    try{
        const accessToken = getState().loginState.user.data.accessToken
        const {data} = await axios.delete(
            `/delete/product/${productId}`,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Product deleted successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}

export const updateProductAdminAction = ( product ) => async (dispatch, getState) => {
    try{
        const { productName, brand, category, price, image, productId } = product
        const accessToken = getState().loginState.user.data.accessToken
        const fData = new FormData()
        fData.append('productName', productName)
        fData.append('brand', brand)
        fData.append('category', category)
        fData.append('price', price)
        fData.append('image', image)
        const {data} = await axios.patch(
            `/update/product/${productId}`,fData,{
                headers:{
                    Authorization : accessToken
                }
            }
        )
        if(data.statusCode === 200){
            NotificationManager.success('Product updated successfully', 'Success')
        }
        else if(data.statusCode === 400){
            NotificationManager.error(data.message, 'Error')
        }
        console.log(data)
    }catch(err){
        console.error(err.message);
    }
}