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
// util
import { formatDate } from '../../utils'
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
    const [page, setPage] = useState(1);
    const [mockData, setMockData] = useState([])
    // 初始化请求第一页
    const getFirstPage = () => {
        return new Promise(resolve => {
            getZoomByPage(token, 1).then(res => {
                res = res.data
                console.log(res);
                const resData = res.map(item => ({
                    ...item,
                    date: formatDate(item.date),
                    content: {
                        text: item.contentText,
                        imgSrc: item.contentImgSrc.split(',')
                    }
                }))
                setMockData(resData)
                resolve(true)
            })
        })
    }
    // 执行一次
    useEffect(() => {
        getFirstPage();
        // eslint-disable-next-line
    }, [])

    // 请求后续
    const getDataByPage = () => {
        getZoomByPage(token, page + 1).then(res => {
            console.log(res)
            const data = res.data
            if (data.length) {
                // 加进来
                setPage(page + 1)
                let testData = [...mockData];
                console.log(data)
                // 分段加
                data.forEach(item => {
                    testData.push({
                        ...item,
                        date: formatDate(item.date),
                        content: {
                            text: item.contentText,
                            imgSrc: item.contentImgSrc.split(',')
                        }
                    })
                })
                setMockData(testData)
            }
        })

    }
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
                {/**添加触底事件 */}
                <Scroll ref={scroll} pullUp={() => {
                    getDataByPage()
                }}
                    pullDown={() => {
                        getFirstPage().then(() => {
                            if (scroll.current.getBScroll) {
                                const BScroll = scroll.current.getBScroll()
                                // 到顶部
                                if (BScroll) {
                                    BScroll.scrollTo(0, 0)
                                }
                            }
                        })
                    }}
                >
                    <div>
                        {
                            mockData.map(item => (<ZoomMessage
                                avator={item.avator}
                                nickName={item.nickName}
                                date={item.date}
                                content={item.content}
                                key={item.id}
                                handleLoad={() => {
                                    // 图片加载后刷新scroll
                                    if (scroll) {
                                        scroll.current.refresh();
                                    }
                                }}
                            />))
                        }
                    </div>
                </Scroll>
            </div>
            {/**发布页面 */}
            <Transition show={pub} >
                <PubZoom onExit={() => {
                    setPub(false)
                    // 重新加载数据
                    setTimeout(() => {
                        getFirstPage().then(() => {
                            if (scroll.current.getBScroll) {
                                const BScroll = scroll.current.getBScroll()
                                // 到顶部
                                if (BScroll) {
                                    BScroll.scrollTo(0, 0)
                                }
                            }
                        })
                    }, 200);
                    // 回归1
                    setPage(1);
                }}></PubZoom>
            </Transition>
        </ZoomStyle>
    )
}
export default Zoom;
