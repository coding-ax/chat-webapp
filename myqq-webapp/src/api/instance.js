// 配置axios实例
import axios from 'axios'
const instance = axios.create({
    // baseURL: 'http://localhost:7001',
    baseURL: 'http://192.168.1.107:7001',
    timeout: 5000,
})
// 配置响应拦截器
instance.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return Promise.resolve(response.data)
        } else {
            return Promise.reject(response)
        }
    }
)

export {
    instance
}