import { Redirect } from 'react-router-dom'
import Login from '../views/Login'
import Home from '../views/Home'
import Message from '../views/Message';
import Zoom from '../views/Zoom'
import Friends from '../views/Friends'
const routes = [
    {
        path: '/',
        exact: true,
        component: Login,
        key: 'Login'
    },
    {
        path: '/home',
        component: Home,
        key: 'Home',
        routes: [
            {
                path: '/home/',
                exact: true,
                render: () => <Redirect to="/home/message" />
            },
            {
                path: '/home/message',
                component: Message
            },
            {
                path: '/home/friends',
                component: Friends
            },
            {
                path: '/home/zoom',
                component: Zoom
            },
            {
                path: '/home/*',
                component: () => <Redirect to="/home/message" />
            },
        ]
    },
    // 配置重定向到主页
    {
        key: '404',
        path: '*',
        component: () => <Redirect to="/" />
    }
]
export default routes