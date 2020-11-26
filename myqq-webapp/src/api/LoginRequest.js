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
        headers: {
            'Content-Type': 'x-www-form-urlencoded'
        },
        data: {
            username,
            password,
        }
    })
}
// 获取信息
const getInfo = (username) => {
    return instance({
        method: 'GET',
        url: '/user/getInfo',
        data: {
            username,
        }
    })
}
export {
    Login,
    getInfo,
    Register
}