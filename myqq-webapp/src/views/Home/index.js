import React, { useState, useEffect } from 'react'

// 导入所涉及到的组件
import { NavBar } from './style'
import { renderRoutes } from 'react-router-config'
import User from '../User'
import Icon from '../../components/context/Icon'
import { Swiper, SwiperSlide } from 'swiper/react'
// 导入对象sass
/* 
** 注意需要 yarn add node-sass@4.14.1
** 否则装错的话需要通过以下命令删除重装
** npm uninstall node-sass
** npm install node-sass@4.14.1
*/
import 'swiper/swiper.scss'

// 导入redux相关组件数据
import { connect } from 'react-redux'
import { actionCreator } from './store'


// 导入全局socket监听器
import { socketListener } from '../../store/socketHandle'

// 定义tabbar配置
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
    // state
    const [currentIndex, setCurrentIndex] = useState(0);
    // redux state
    const { token, isLogin, socket } = props;
    // redux dispatch
    const { socketConnect } = props;
    // react-router
    const { history, location } = props;
    // 处理tabbar刷新bug
    useEffect(() => {
        // 处理刷新
        tabbarConfig.forEach((item, index) => {
            if (item.path === location.pathname) {
                setCurrentIndex(index);
                return;
            }
        })
    }, [location.pathname])

    // 鉴权：未登录则回到登录
    useEffect(() => {
        if (!isLogin) {
            history.push('/')
        }
    }, [isLogin, history])

    // 进行socket连接
    useEffect(() => {
        if (token) {
            if (socket === null) {
                socketConnect(token)
            }
        }
    }, [token, socket, socketConnect])

    // 为socket绑定on事件
    useEffect(() => {
        if (socket) {
            socketListener(socket)
        }
    }, [socket])
    return (
        <div style={{ position: "fixed", width: '100vw', height: '100vh' }}>
            <Swiper
                style={{ position: "fixed", width: '100vw', height: '100vh' }}
                //不需要边距
                spaceBetween={0}
                //默认在第二页
                initialSlide={1}
                slidesPerView={1}
            >
                {/**设置页 */}
                <SwiperSlide >
                    <User></User>
                </SwiperSlide>

                {/**主界面 */}
                <SwiperSlide>
                    <div style={{ width: '100vw', height: '100vh', overflow: 'scroll' }}>
                        <div>
                            {/**渲染页面 */}
                            {renderRoutes(props.route.routes)}

                            {/**tabbar导航 */}
                            <NavBar>
                                {tabbarConfig.map((item, index) => (
                                    <div key={item.path} onClick={() => {
                                        /** 进行tabbar的切换 */
                                        props.history.push(item.path)
                                        setCurrentIndex(index)
                                    }}>
                                        {currentIndex === index ? <Icon size='2rem' key={item.path} xlinkHref={item.xlinkHrefActive} /> : <Icon size='2rem' xlinkHref={item.xlinkHref} />}
                                        <div style={{ color: currentIndex === index ? '#3498db' : '#666666' }}>{item.text}</div>
                                    </div>
                                ))}
                            </NavBar>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>

    )
}
// redux连接
const mapStateToProps = (state) => {
    return {
        token: state.LoginReducer.token,
        isLogin: state.LoginReducer.isLogin,
        socket: state.HomeReducer.socket
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        socketConnect: (token) => {
            dispatch(actionCreator.socketConnect(token))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Home));