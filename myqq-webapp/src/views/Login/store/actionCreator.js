import { actionType } from './index'
// 登录函数
import { Login, getInfo } from '../../../api/LoginRequest'
// 定义action
// 改变TOKEN
const changeToken = (data) => (
    {
        type: actionType.TOKEN,
        data: data
    }
)
// 改变userINFO
const changeUserInfo = (data) => (
    {
        type: actionType.USERINFO,
        data: data
    }
)
// 增加loading
const changeLoading = (data) => (
    {
        type: actionType.LOADING,
        data: data
    }
)
// isLogin
const changeIsLogin = (data) => (
    {
        type: actionType.ISLOGIN,
        data: data
    }
)
// 编写登录动作 到时候将这个导出 在ui层里面使用
export const getLogin = (username, password) => {
    //redux-thunk使用
    return dispatch => {
        Login(username, password).then(res => {
            let token = res.data.token
            // 成功获取token则派发数据 否则返回失败
            console.log(token)
            if (token) {
                dispatch(changeToken(token));
                setTimeout(() => {
                    dispatch(changeIsLogin(true));
                    dispatch(changeLoading(false))
                }, 1000);
            }
            else {
                console.log(res)
                setTimeout(() => {
                    dispatch(changeIsLogin(false));
                    dispatch(changeLoading(false))
                }, 1000);
            }
        })
    }
}
// 获取用户信息
export const getUserInfo = (username) => {
    return dispatch => {
        getInfo(username).then(res => {
            let userInfo = res.data
            if (userInfo) {
                dispatch(changeUserInfo(userInfo))
            }
            else {
                console.log(res)
            }
        })
    }
}

// 根据status修改loading
export const changeLoadingStatus = (status) => {
    return dispatch => {
        dispatch(changeLoading(status))
    }
}

// 修改isLogin
export const changeIsLoginStatus = (status) => {
    return dispatch => {
        dispatch(changeIsLogin(status))
    }
}