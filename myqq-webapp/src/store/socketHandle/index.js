// 导入相关数据的操作方法并以此进行设置redux
import { actionCreator as homeActionCreator } from '../../views/Home/store'
import { actionCreator as chatActionCreator } from '../../views/Chat/store'
// 导入store以应用dispatch
import store from '../index'
// 导入网络请求方法
import { getInfoByUserID } from '../../api/LoginRequest';
const dispatch = store.dispatch;
// 在这里获取store状态

// socket必须保证只被调用一次 在这里利用isOK变量控制
let isOk = false;
export const socketListener = (socket) => {
    // 为socket添加事件
    if (socket && !isOk) {
        isOk = true;
        console.log("事件已经绑定");
        // 监听res
        socket.on('res', (data) => {
            console.log(data)
        })
        // 监听登录响应
        socket.on('login', (data) => {
            console.log(data)
        })
        // 设置404错误监听
        socket.on('404', (data) => {
            console.log(data)
        })
        // 设置错误监听
        socket.on('error', (data) => {
            console.log(data)
        })
        // 设置用户数据
        socket.on('detail', (data) => {
            console.log(data)
            // 派发message
            dispatch(homeActionCreator.userInfoChange(data.message))
        })

        // 监听好友列表名单
        socket.on('friendList', (data) => {
            console.log(data)
            dispatch(homeActionCreator.friendListChange(data.data))
        })
        // 监听好友搜索结果
        socket.on('searchFriend', (data) => {
            console.log(data)
            dispatch(homeActionCreator.searchFriendListChange(data.message))
        })
        // 监听好友添加响应
        socket.on('addFriend', data => {
            console.log(data)
        })

        // 监听登录消息
        socket.on('loginMessage', data => {
            console.log(data)
            const unReadMessageList = data.data.obj;
            dispatch(chatActionCreator.unReadMessageListChange(unReadMessageList))
        })
        // 监听获取聊天记录
        socket.on('targetChatMessage', data => {
            // console.log(data.messageList)
            dispatch(chatActionCreator.messageListChange(data.messageList))
        })
        // 获取收到的消息
        socket.on('message', data => {
            const target = store.getState().ChatReducer.target
            const token = store.getState().LoginReducer.token
            // 正在聊天的处理
            if (target === data.dispatcher) {
                // 加入到现在正在聊天的位置
                dispatch(chatActionCreator.addMessageList(data))
            }
            // 未聊天的处理
            else {
                // 加入到未读中
                console.log("未读", data)
                // 如果在当前其消息队列
                const unReadMessageList = store.getState().ChatReducer.unReadMessageList;
                let tempUnReadMessageList = {
                    ...unReadMessageList
                }
                const userID = data.dispatcher
                if (userID in tempUnReadMessageList) {
                    console.log('userid');
                    tempUnReadMessageList[userID] = {
                        ...tempUnReadMessageList[userID],
                        count: tempUnReadMessageList[userID].count + 1,
                        lastMessage: data.messageValue,
                        ...data
                    }
                    dispatch(chatActionCreator.unReadMessageListChange(tempUnReadMessageList))
                } else {
                    console.log("不在list")
                    getInfoByUserID(userID, token).then(res => {
                        const userDetail = res.data[0]
                        if (userDetail) {
                            tempUnReadMessageList[userID] = {
                                ...tempUnReadMessageList[userID],
                                ...data,
                                ...userDetail,
                                count: 1,
                                lastMessage: data.messageValue
                            }
                            dispatch(chatActionCreator.unReadMessageListChange(tempUnReadMessageList))
                        }

                    })
                }
                // dispatch(chatActionCreator.addUnReadMessageList(data))
            }
        })
        // // 获取发送动态
        // socket.on('send', data => {
        //     console.log(data)
        // })
        // 监听获取对方信息：
        socket.on('UserDetailByUserIDs', data => {
            console.log(data)
            if (data.status) {
                let list = data.data;
                const { type } = data;
                switch (type) {
                    // 聊天中分发的
                    case 'chat':
                        dispatch(chatActionCreator.targetDetailChange(list[0]))
                        break;
                    default:
                        break;
                }
            }
        })

    }
}