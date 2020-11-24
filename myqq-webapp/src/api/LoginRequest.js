import { instance } from '../api/instance'
const Login = (username, password) => {
    return instance({
        method: 'POST',
        url: `/user/login`,
        params: {
            username,
            password,
        }
    })
}
const Register = (username,password)=>{
    return instance({
        method: 'POST',
        url: '/user/register',
        params: {
            username,
            password,
        }
    })
}
const getInfo=(username)=>{
    return instance({
        method: 'GET',
        url: '/user/getInfo',
        params: {
            username,
        }
    })
}
export {
    Login,
    getInfo,
    Register
}