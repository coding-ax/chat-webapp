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