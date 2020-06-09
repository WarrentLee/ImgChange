import {combineReducers} from 'redux'

import storageUtils from '../utils/storageUtils'

import {
    CHOOSE_TYPE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER
} from './action-types'

const initUser = storageUtils.getUser();
const initType = '';


function user(state = initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg;
            return {...state,errorMsg}
        case RESET_USER:
            return {}
        default:
            return state;
    }
}


function chooseType(state = initType, action) {
    switch (action.type) {
        case CHOOSE_TYPE:
            return action.data;
        default:
             return state;
    }
}

export default combineReducers({
    user, chooseType
})