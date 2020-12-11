// 执行后返回已经连接的socket对象
// import { io } from 'socket.io-client'
const getSocket = (token) => {
    console.log(token)
    // 使用全局的io import io 会造成无限循环请求 无法使用，存疑
    return window.io(`http://localhost:7001?token=${token}`)
    // return window.io(`http://192.168.0.106:7001?token=${token}`)
    // return io(`http://localhost:7001?token=${token}`)
}
export {
    getSocket
}