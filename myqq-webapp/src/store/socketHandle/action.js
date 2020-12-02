// 设置派发
// 请求自己用户信息数据
export const getDetail = (socket) => {
    if (socket) {
        socket.emit('getDetail', {});
    }
}

// 信息编辑完成
export const editUserDetail = (socket, userInfo) => {
    if (socket) {
        socket.emit('editUserDetail', userInfo)
    }
}

// 获取好友列表
export const getFriendShip = (socket) => {
    if (socket) {
        socket.emit('getFriendList', {});
    }
}

// 搜索好友
export const getSearchFriend = (socket, keyword) => {
    if (socket) {
        socket.emit('getSearchFriend', {
            keyword
        })
    }
}