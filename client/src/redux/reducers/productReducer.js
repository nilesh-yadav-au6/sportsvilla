import { PRODUCT_FETCH ,TOGGLE_PRODUCT_STATE , SINGLE_PRODUCT_FETCH} from '../actionType'

const initialState = {
    products: null,
    singleProduct:null,
    isAuthenticating: false,
    count: null,
    page: 1
}

const productReducers = (state = initialState, action) => {
    const { type, payload, count, page } = action
    switch(type){
        case  PRODUCT_FETCH:
            return {...state, products: payload, count, page }
        case  SINGLE_PRODUCT_FETCH:
            return {...state, singleProduct: payload}
        case TOGGLE_PRODUCT_STATE:
            return { ...state, isAuthenticating: !state.isAuthenticating }
        default:
            return state
    }
}

export default productReducers