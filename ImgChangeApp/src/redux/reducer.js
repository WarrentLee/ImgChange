import {combineReducers} from 'redux'

import storageUtils from '../utils/storageUtils'

import {
    CHOOSE_TYPE,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    RESET_USER,
    STYLE_IMG,
    RESET_STYLE_IMG,
    FACE_IMG,
    RESET_FACE_IMG
} from './action-types'

const initUser = storageUtils.getUser();
const initType = {};
const initImg = '';


function user(state = initUser,action) {
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.errorMsg;
            return {...state,errorMsg}
        case RESET_USER:
            return {};
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

function styleImg(state = initImg, action) {
    switch (action.type) {
        case STYLE_IMG:
            console.log('reducer'+action.img);
            return action.img;
        case RESET_STYLE_IMG:
            return ''
        default:
            return state;
    }
}

function faceImg(state = initImg, action) {
    switch (action.type) {
        case FACE_IMG:
            console.log('reducer' + action.img);
            return action.img;
        case RESET_FACE_IMG:
            return ''
        default:
            return state;
    }
}


export default combineReducers({
    user, chooseType, styleImg, faceImg
})