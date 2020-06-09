import {
    message
} from 'antd'
import ajax from './ajax'
import second from '../assets/images/logo.png'

const BASE = ''

export const reqLogin = (username, password) => ajax(BASE + '/login', {
    username,
    password
}, 'POST')

export const reqUser = (username) =>ajax(BASE+'/usercenter',{username},'GET')

export const reqImg1 = () => ajax('https://www.mocky.io/v2/5cc8019d300000980a055e76', {})
export const reqImg2 = () => ({url:second})