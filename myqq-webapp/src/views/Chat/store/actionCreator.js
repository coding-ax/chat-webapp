import { actionType } from './index';
const changeTarget = data => ({
    type: actionType.TARGET,
    data
})
const changeTargetDetail = data => ({
    type: actionType.TARGETDETAIL,
    data
})
const changeMessageList = data => ({
    type: actionType.MESSAGELIST,
    data
})
const changeAddMessageList = data => ({
    type: actionType.INSERTONEROWMESSAGELIST,
    data
})
const changeUnReadMessageList = data => ({
    type: actionType.UNREADMESSAGELIST,
    data
})
const changeFriendList = data => ({
    type: actionType.FRIENDLIST,
    data
})
const changeMessage = data => ({
    type: actionType.CHANGELASTMESSAGE,
    data
})
const changeCount = data => ({
    type: actionType.CHANGECOUNT,
    data
})
// 设置target
export const targetChange = target => {
    return dispatch => {
        dispatch(changeTarget(target))
    }
}

// 设置
export const targetDetailChange = targetDetail => {
    return dispatch => {
        dispatch(changeTargetDetail(targetDetail))
    }
}

export const messageListChange = messageList => {
    return dispatch => {
        dispatch(changeMessageList(messageList))
    }
}

// 添加一条message
export const addMessageList = message => {
    return dispatch => {
        dispatch(changeAddMessageList(message))
    }
}
// 修改unreadmessagelist
export const unReadMessageListChange = unReadMessageList => {
    return dispatch => {
        dispatch(changeUnReadMessageList(unReadMessageList))
    }
}
// 修改好友列表
export const friendListChange = friendList => {
    return dispatch => {
        dispatch(changeFriendList(friendList))
    }
}

// 修改count data:{ count, target }
export const countChange = (countData) => {
    return dispatch => {
        dispatch(changeCount(countData))
    }
}

export const messageChange = (messageData) => {
    return dispatch => {
        dispatch(changeMessage(messageData))
    }
}