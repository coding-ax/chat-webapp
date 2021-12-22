// 配置axios实例
import axios from 'axios'
console.log(process.env)
const instance = axios.create({
    baseURL: process.env.REACT_APP_REQUEST_API,
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