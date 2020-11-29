import { actionType } from './index'
// 登录函数
import { Login, getInfo, Register } from '../../../api/LoginRequest'
// 定义action
// 改变TOKEN
const changeToken = (data) => (
    {
        type: actionType.TOKEN,
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
// error
const changeError = (data) => (
    {
        type: actionType.ERROR,
        data: data
    }
)
// register
const changeRegister = (data) => (
    {
        type: actionType.REGISTER,
        data: data
    }
)
// 注册
export const getRegister = (username, password) => {
    return dispatch => {
        Register(username, password).then(res => {
            if (res.data.status) {
                setTimeout(() => {
                    dispatch(changeLoading(false));
                    dispatch(changeRegister(true))
                }, 1000);
            } else {
                setTimeout(() => {
                    dispatch(changeLoading(false));
                    dispatch(changeError(true));
                }, 1000);
            }
        }).catch(res => {
            console.log(res)
            setTimeout(() => {
                dispatch(changeLoading(false));
                dispatch(changeError(true));
            }, 1000);
        })
    }
}

// 编写登录动作 到时候将这个导出 在ui层里面使用
export const getLogin = (username, password) => {
    //redux-thunk使用
    return dispatch => {
        Login(username, password).then(res => {
            let token = res.data.token
            // 成功获取token则派发数据 否则返回失败
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
                    dispatch(changeLoading(false));
                    dispatch(changeError(true));
                }, 1000);
            }
        }).catch(res => {
            console.log(res)
            setTimeout(() => {
                dispatch(changeIsLogin(false));
                dispatch(changeLoading(false));
                dispatch(changeError(true));
            }, 1000);
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

// 修改error
export const changeErrorStatus = (status) => {
    return dispatch => {
        dispatch(changeError(status))
    }
}

// 修改register
export const changeRegisterStatus = (status) => {
    return dispatch => {
        dispatch(changeRegister(status))
    }
}