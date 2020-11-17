import React, { useState, useEffect } from 'react'
import { NavBar } from './style'

// 导入组件
import { NavLink, HashRouter as Router, withRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
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
        xlinkHref: '#icon-dongtai',
        xlinkHrefActive: '#icon-dongtai-copy',
        path: '/home/zoom',
        text: 'zoom'
    }
]
function Home(props) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        // 处理刷新
        tabbarConfig.forEach((item, index) => {
            if (item.path === props.location.pathname) {
                setCurrentIndex(index);
                return;
            }
        })
    }, [])
    return (<div style={{ position: "fixed", width: '100vw', height: '100vh' }}>
        <Router>
            {renderRoutes(props.route.routes)}
            <NavBar>
                {tabbarConfig.map((item, index) => (
                    <div key={item.path} onClick={() => {
                        props.history.push(item.path)
                        setCurrentIndex(index)
                    }}>
                        {currentIndex === index ? <Icon size='2rem' key={item.path} xlinkHref={item.xlinkHrefActive} /> : <Icon size='2rem' xlinkHref={item.xlinkHref} />}
                        <div style={{ color: currentIndex === index ? '#3498db' : '#666666' }}>{item.text}</div>
                    </div>
                ))}
            </NavBar>
        </Router>


    </div>)
}
export default React.memo(Home);