// 导入相关数据的操作方法并以此进行设置redux
import { actionCreator as homeActionCreator } from '../../views/Home/store'
import { actionCreator as chatActionCreator } from '../../views/Chat/store'
// 导入store以应用dispatch
import store from '../index'
const dispatch = store.dispatch;
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
        })
        // 监听获取聊天记录
        socket.on('targetChatMessage', data => {
            console.log(data.messageList)
            dispatch(chatActionCreator.messageListChange(data.messageList))
        })
        // 获取收到的消息
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