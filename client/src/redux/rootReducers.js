import  { combineReducers } from 'redux'
import registerReducer from './reducers/registerReducer'
import loginReducer from './reducers/loginReducer'
import confirmEmailReducer from './reducers/confirmEmailReducer'
import forgotEmailReducer from './reducers/forgotPasswordReducer'
import resetPasswordReducer from './reducers/resetPasswordReducer'
import scheduleReducer from "./reducers/scheduleReducer"
import productReducer from "./reducers/productReducer"
import pendingOrder from './reducers/pendingOrdReducer'
import addCartReducer from './reducers/addCartReducer'
import getCartReducer from './reducers/getCartReducer'
import teamReducer from './reducers/TeamReducers'
import playerReducer from './reducers/playerReducers'
import editUserReducer from "./reducers/userReducer"
import auctionPlayer from "./reducers/auctionReducer"
import hofPlayerReducer from "./reducers/hofReducer"
import reviewReducer from "./reducers/reviewReducer"

const rootReducer = combineReducers({
    registerState: registerReducer,
    loginState: loginReducer,
    confirmEmailState: confirmEmailReducer,
    forgotEmailState: forgotEmailReducer,
    resetPasswordState: resetPasswordReducer,
    scheduleState:scheduleReducer,
    productState : productReducer,
    pendingOrderState: pendingOrder,
    addCartState: addCartReducer,
    getCartState: getCartReducer,
    teamState: teamReducer,
    playerState: playerReducer,
    userState:editUserReducer,
    auctionState: auctionPlayer,
    hofPlayerState:hofPlayerReducer,
    reviewState:reviewReducer,
})

export default rootReducer