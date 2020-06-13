import ajax from './ajax'
import axios from 'axios'

const BASE = ''

export const reqRegister = (username, password) => ajax(BASE + '/api/user/register', {
    username,
    password
}, 'POST')

export const reqLogin = (username, password) => ajax(BASE + '/api/user/login', {
    username,
    password
}, 'POST')

export const upOriginImg = (img,config) =>axios.post(BASE+'/api/image/',img,config)
//  ajax(BASE + '/api/image/', {image:img}, 'POST',config)

//
// export const reqImgById = (id) => ajax(BASE + `/api/image/${id}`, {id}, 'GET')

//修改密码
export const changePassword = (old_password, new_password) => axios.post(BASE + '/api/user/password', {
    old_password,
    new_password
})


//请求注销
export const reqLogout = () => ajax(BASE + '/api/user/logout', {}, 'GET')


// export const reqImg1 = (img, config) => ajax(BASE + '/api/change/style', img, 'POST', config)

export const reqImg1 = (img, config) => axios.post(
    BASE + '/api/change/style', img, config
).then((response) => {
    var data = response.data;
    // console.log(response);
    let u8a = new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '');
    let src = `data:image/png;base64, ${ btoa(u8a) }`;
    return src;
});

export const reqImg2 = (img, config) => axios.post(
    BASE + '/api/change/face', img, config
).then((response) => {
    var data = response.data;
    if(response.status === 202){
        return response;
    }
    let u8a = new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '');
    let src = `data:image/png;base64, ${ btoa(u8a) }`;
    return src;
});


    // // var getImgsFromId = async (userId) => {
    // //         return await reqImgById(userId);
    // // }
    // return async ()=>{
    // const result = await reqUserImg();
    // console.log(result);
    // var imgsId = result.data.images;
    // // const imgs = setTimeout(, 200) 
    // // imgsId.map(items => {
    // //      var response = func(items);
    // //      console.log(response);
    // //     //  let u8a = new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), '');
    // //     //  let src = `data:image/png;base64, ${ btoa(u8a) }`;
    // //     //  return src;
    // //     })
    // // return imgs
    // var handleImg = (id)=>{
    //     var response = getImgsFromId(id);
    //     console.log(response);
    //     let u8a = new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '');
    //     let src = `data:image/png;base64, ${ btoa(u8a) }`;
    //     console.log(src);
    // }

    // for (let i = 0; i <20; i++) {
    //     setTimeout((i) => {
    //         handleImg(i);
    //     }, 200);
    // }
    // }






// new Promise((resolve, reject)=>{ 
//     console.log(img);
//     axios.post(BASE + '/api/change/style', img, config).then(response => {
//     resolve(response)
//     // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
//     }).catch(error => {
//     })
// })


// export const reqImg2 = () => ({url:second})

// export const reqImgsId = () => ajax('https://www.mocky.io/v2/5cc8019d300000980a055e76', {})