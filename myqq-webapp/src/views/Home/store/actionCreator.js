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

const changeFriendList = data => (
    {
        type: actionType.FRIENDLIST,
        data
    }
)
const changeSearchFriendList = data => (
    {
        type: actionType.SEARCHFRIENDLIST,
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
    return dispatch => {
        // userInfo传入就是最后的结果 
        dispatch(changeUserInfo(userInfo))
    }
}
// 设置朋友列表
export const friendListChange = friendList => {
    return dispatch => {
        dispatch(changeFriendList(friendList))
    }
}
// 设置搜索朋友列表
export const searchFriendListChange = searchFriendList => {
    return dispatch => {
        dispatch(changeSearchFriendList(searchFriendList))
    }
}