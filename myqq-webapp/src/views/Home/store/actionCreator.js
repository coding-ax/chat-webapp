import { actionType } from './index'
// 连接
import { getSocket } from '../../../api/GetSocket'

const changeSocket = (data) => (
    {
        type: actionType.SOCKET,
        data
    }
)
const changeUserInfo = data => (
    {
        type: actionType.USERINFO,
        data
    }
)
// 导出action操作方法

// 根据token设置socket
export const socketConnect = (token) => {
    return dispatch => {
        // 初始化socket对象
        const socket = getSocket(token)
        dispatch(changeSocket(socket))
    }
}
// 设置userInfo
export const userInfoChange = userInfo => {
    console.log('???')
    return dispatch => {
        console.log(dispatch)
        // userInfo传入就是最后的结果 
        dispatch(changeUserInfo(userInfo))
    }
}