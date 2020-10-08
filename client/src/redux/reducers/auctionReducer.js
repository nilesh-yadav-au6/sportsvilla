import { CUR_AUCTION_PLAYER, TOGGLE_CUR_AUCTION_PLAYER } from '../actionType'

const initialState = {
    curPlayer: null,
    isFetching: false,
}

const currentAuctionPlayer = (state = initialState, action) => {
    const { type, payload } = action
    switch(type){
        case CUR_AUCTION_PLAYER:
            return {...state, curPlayer: payload}
        case TOGGLE_CUR_AUCTION_PLAYER:
            return { ...state, isFetching: !state.isFetching }
        default:
            return state
    }
}

export default currentAuctionPlayer