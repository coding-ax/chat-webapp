import React, { useRef, useState, useEffect } from 'react'
import Nav from '../../components/common/Nav'
import ZoomMessage from '../../components/context/ZoomMessage'
import Scroll from '../../components/common/Scroll'
import styled from 'styled-components'
import Transition from '../../components/common/Transition'
import PubZoom from '../PubZoom'
import Icon from '../../components/context/Icon'
// 获取分页数据
import { getZoomByPage } from '../../api/HomeRequest'
// redux
import { useSelector } from 'react-redux'
const ZoomStyle = styled.div`
    .wrapper{
      position:absolute;
      left:0;
      right:0;
      bottom:3rem;
      top:3.5rem;
      background-color:#fff;
    }
`

const Zoom = (props) => {
    // 打开发布
    const [pub, setPub] = useState(false)
    const token = useSelector(state => state.LoginReducer.token)
    const page = useState(1);
    useEffect(() => {
        getZoomByPage(token, page).then(res => {
            console.log(res)
        })
    }, [])
    const mockData = [
        {
            id: 1,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 2,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3363295869,2467511306&fm=26&gp=0.jpg',
                    'https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg',
                    'https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 3,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 4,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        },
        {
            id: 5,
            avator: 'https://xgpax.top/wp-content/uploads/2020/08/head.png',
            nickName: 'ax',
            date: new Date().toLocaleTimeString(),
            content: {
                text: "突然想起你，看了看自己",
                imgSrc: ['https://xgpax.top/wp-content/uploads/2020/12/wp_editor_md_10df0de154bd5b6dded717f1beafbb1a.jpg']
            }
        }
    ]
    // scroll
    const scroll = useRef(null)
    return (
        <ZoomStyle>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>Zoom</span>
                <span>
                    <span style={{ position: "relative", left: '-1rem' }} onClick={() => [
                        setPub(true)
                    ]}>
                        <Icon
                            xlinkHref={"#icon-add"}
                            size={'1.8rem'}
                        />
                    </span>
                </span>
            </Nav>
            {/**显示动态 */}
            <div className="wrapper">
                <Scroll ref={scroll}>
                    <div>
                        {
                            mockData.map(item => (<ZoomMessage
                                avator={item.avator}
                                nickName={item.nickName}
                                date={item.date}
                                content={item.content}
                                key={item.id}
                            />))
                        }
                    </div>
                </Scroll>
            </div>
            {/**发布页面 */}
            <Transition show={pub} >
                <PubZoom onExit={() => {
                    setPub(false)
                }}></PubZoom>
            </Transition>
        </ZoomStyle>
    )
}
export default Zoom;
