import { instance } from '../api/instance'
// 登录函数
const Login = (username, password) => {
    return instance({
        method: 'POST',
        url: `/user/login`,
        data: {
            username,
            password,
        }
    })
}
// 注册
const Register = (username, password) => {
    return instance({
        method: 'POST',
        url: '/user/register',
        data: {
            username,
            password,
        }
    })
}
// 获取信息
const getInfo = (username, token) => {
    return instance({
        method: 'GET',
        url: '/user/getInfo',
        data: {
            username,
        },
        headers: {
            'Authorization': "Bearer " + token
        }
    })
}
// 通过userID获取信息
const getInfoByUserID = (userID, token) => {
    return instance({
        method: 'POST',
        url: '/user/getInfoByID',
        headers: {
            'Authorization': "Bearer " + token
        },
        data: {
            userID
        }
    })
}
export {
    Login,
    getInfo,
    Register,
    getInfoByUserID
}