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