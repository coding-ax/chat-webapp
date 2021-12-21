// 执行后返回已经连接的socket对象
// import { io } from 'socket.io-client'
const getSocket = (token) => {
    // 使用全局的io import io 会造成无限循环请求 无法使用，存疑
    return window.io(`https://myqq.xgpax.top/api/?token=${token}`)
}
export {
    getSocket
}