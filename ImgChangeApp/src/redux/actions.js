import {
    CHOOSE_TYPE,
    RECEIVE_USER,
    RESET_USER,
    SHOW_ERROR_MSG
} from './action-types'
import {reqLogin} from '../api'
import storageUtils from '../utils/storageUtils'

// function getBase64(file) {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = error => reject(error);
//     })
// }


export const receiveUser = (user)=>({type:RECEIVE_USER,user});

export const logout = ()=>{
    storageUtils.removeUser();
    return {type:RESET_USER};
}

export const showErrorMsg = (errorMsg) => ({type:SHOW_ERROR_MSG,errorMsg})

export const login = (username,password) =>{
    return async dispatch =>{
        const result = await reqLogin(username,password);;
        if(result.status === 0){
            const user = result.data;
            console.log(user)
            storageUtils.saveUser(user);
            dispatch(receiveUser(user));
        }else{
            const msg = result.msg;
            dispatch(showErrorMsg(msg));
        }
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