// 配置axios实例
import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://127.0.0.1:7001',
    timeout: 5000,
})
export {
    instance
}