import { Redirect } from 'react-router-dom'
import Login from '../views/Login'
import Home from '../views/Home'
const routes = [
    {
        path: '/',
        exact: true,
        component: Login
    },
    {
        path: '/home',
        component: Home
    },
     // 配置重定向到主页
    // {
       
    //     path: '*',
    //     component: () => <Redirect to="/" />
    // }
]
export default routes