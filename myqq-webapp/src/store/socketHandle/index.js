// 导入相关数据的操作方法并以此进行设置redux
import { actionCreator } from '../../views/Home/store'
// 导入store以应用dispatch
import store from '../index'
const dispatch = store.dispatch;
export const socketListener = (socket) => {
    // 为socket添加事件
    if (socket) {
        // 监听res
        socket.on('res', (data) => {
            console.log("监听自socketListener", data)
        })
        // 监听登录响应
        socket.on('login', (data) => {
            console.log("监听自socketListener", data)
        })
        // 设置404错误监听
        socket.on('404', (data) => {
            console.log("监听自socketListener", data)
        })
        // 设置用户数据
        socket.on('detail', (data) => {
            console.log("监听自socketListener", data)
            // 派发message
            dispatch(actionCreator.userInfoChange(data.message))
        })
    }
}