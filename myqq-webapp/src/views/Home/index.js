import React, { useState } from 'react'
import { NavBar } from './style'

// 导入组件
import { NavLink } from 'react-router-dom'
import Icon from '../../components/context/Icon'
const tabbarConfig = [
    {
        xlinkHref: '#icon-liaotian',
        xlinkHrefActive: '#icon-liaotian-copy',
        path: '/home/message',
        text: '消息'
    },
    {
        xlinkHref: '#icon-yonghu-copy',
        xlinkHrefActive: '#icon-yonghu',
        path: '/home/friends',
        text: '朋友'
    },
    {
        xlinkHref: '#icon-xingqiu',
        xlinkHrefActive: '#icon-xingqiu-copy',
        path: '/home/zoom',
        text: 'zoom'
    }
]
function Home(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    return (<div style={{ position: "fixed", width: '100vh' }}>

        <NavBar>
            {tabbarConfig.map((item, index) => (<NavLink to={item.path} key={item.path}>
                {currentIndex === index ? <Icon size='2rem' xlinkHref={item.xlinkHrefActive} /> : <Icon size='2rem' xlinkHref={item.xlinkHref} />}
                <div style={{ color: currentIndex === index ? '#3498db' : '#666666' }}>{item.text}</div>
            </NavLink>))}
        </NavBar>
    </div>)
}
export default React.memo(Home)