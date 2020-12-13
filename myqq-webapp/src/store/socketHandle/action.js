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

// 发起添加
export const getAddFriend = (socket, target) => {
    if (socket) {
        socket.emit('getAddFriend', {
            target
        })
    }
}
// 发起同意好友申请
export const getAgreeFriend = (socket, target) => {
    if (socket) {
        socket.emit('getAgreeFriend', {
            target
        })
    }
}
// 发起删除好友
export const getDeleteFriend = (socket, target) => {
    if (socket) {
        socket.emit('getDeleteFriend', {
            target
        })
    }
}

// 聊天相关
// 根据对方target获取详细 userIDs必须是一个数组
export const getUserDetailByUserIDs = (socket, userIDs, type) => {
    if (socket) {
        socket.emit('getUserDetailByUserIDs', {
            list: userIDs,
            type
        })
    }
}

// 发送消息
export const chat2target = (socket, target, message) => {
    // 针对message进行base64编码
    message = {
        ...message,
        // 针对文字进行编码
        value: message.type === 1 ? window.btoa(window.encodeURIComponent(message.value)) : message.value
    }
    if (socket) {
        socket.emit('chat2target', {
            target,
            message
        })
    }
}
// 获取聊天记录
export const getTargetChatMessage = (socket, target) => {
    if (socket) {
        socket.emit('getTargetChatMessage', {
            target
        })
    }
}
