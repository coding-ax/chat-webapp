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
const changeAddUnReadMessageList = data => ({
    type: actionType.INSERTONEROWUNREADMESSAGELIST,
    data
})
const changeFriendList = data => ({
    type: actionType.FRIENDLIST,
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
// 添加一条
export const addUnReadMessageList = unReadMessage => {
    return dispatch => {
        dispatch(changeAddUnReadMessageList(unReadMessage))
    }
}
// 修改好友列表
export const friendListChange = friendList => {
    return dispatch => {
        dispatch(changeFriendList(friendList))
    }
}