import React, { useState, useEffect } from 'react'
import { NavBar } from './style'

// 导入组件
import { renderRoutes } from 'react-router-config'
import Config from '../Config'
import Icon from '../../components/context/Icon'
import { Swiper, SwiperSlide } from 'swiper/react'
// 导入redux
import { connect } from 'react-redux'
// 注意需要 yarn add node-sass@4.14.1
// 否则装错的话：以下命令删除重装
//npm uninstall node-sass
//npm install node-sass@4.14.1
import 'swiper/swiper.scss'

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
    // redux
    const { token, isLogin } = props;
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
            console.log(i++);
            // const socket = getSocket(token);
            // console.log(socket)
            // socket.on('login', (socket) => {
            //     console.log('连接上了')
            // });


        }
    }, [token])
    return (
        <div style={{ position: "fixed", width: '100vw', height: '100vh' }}>
            <Swiper
                style={{ position: "fixed", width: '100vw', height: '100vh' }}
                //不需要边距
                spaceBetween={0}
                //默认在第二页
                initialSlide={1}
                slidesPerView={1}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={(event) => console.log('slide change', event)}
            >
                {/**设置页 */}
                <SwiperSlide >
                    <Config></Config>
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
        isLogin: state.LoginReducer.isLogin
    }
}

export default connect(mapStateToProps)(React.memo(Home));