import {
    CHOOSE_TYPE,
    RECEIVE_USER,
    RESET_USER,
    SHOW_ERROR_MSG,
    STYLE_IMG,
    RESET_STYLE_IMG,
    FACE_IMG,
    RESET_FACE_IMG,
    CANT_FOUND_FACE
} from './action-types'
import {
    reqLogin,
    reqRegister,
    reqLogout,
    reqImg1,
    reqImg2,
} from '../api'
import storageUtils from '../utils/storageUtils'


export const receiveUser = (user)=>({type:RECEIVE_USER,user});



export const logoutUser = ()=>{
    return {type:RESET_USER};
}

export const logout = () => {
    storageUtils.removeUser();
    return async dispatch=>{
        await reqLogout();
        dispatch(logoutUser());
    }
}

export const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG,errorMsg})

export const login = (username,password) =>{
    return async dispatch =>{
        const result = await reqLogin(username,password);
        console.log(result);
        if (result.data.success) {
            const user = result.data.user;
            storageUtils.saveUser(user);
            dispatch(receiveUser(user));
        }else{
            dispatch(showErrorMsg("登录失败，请更换用户名或检查网络"));
        }
    }
}





//style
export const getStyleImg = (img) => ({
    type: STYLE_IMG,
    img
});


export const reqStyleImg = (img, config) => {
    return async dispatch => {
        const result = await reqImg1(img, config);
        console.log(result);
        dispatch(getStyleImg(result));
    }
}

export const getUsers =  () => {

}

export const resetStyleImg = () => {
    return {
        type: RESET_STYLE_IMG
    };
}



//face
export const getFaceImg = (img) => ({
    type: FACE_IMG,
    img
});


export const reqFaceImg = (img, config) => {
    return async dispatch => {
        const result = await reqImg2(img, config);
        if(result.status===202){
            dispatch(CantFoundFace('notfound'))
            return;
        }
        dispatch(getFaceImg(result));
    }
}

export const CantFoundFace = (msg) => {
    return {
        type: CANT_FOUND_FACE, msg
    };
}

export const resetFaceImg = () => {
    return {
        type: RESET_FACE_IMG
    };
}

export const register = (username, password) => {
    return async dispatch => {
        const result = await reqRegister(username, password);
        if (result.data.success) {
            const user = result.data.user;
            console.log(user)   
            storageUtils.saveUser(user);
            dispatch(receiveUser(user));
        } else {
            dispatch(showErrorMsg("注册失败，请更换用户名或检查网络"));
        }
        console.log(result);
    }
}

export const setChooseType = (choosetype) => ({
    type: CHOOSE_TYPE, 
    data:choosetype
})


// export const getChooseType = (choosetype)=>({

// })

// export const showImage = async ({file,fileList})=>{
//       var imgSrc = await getBase64(file.originFileObj);
//       return {
//           imageSrc:imgSrc,
//           fileList:fileList
//       }
// }