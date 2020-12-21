import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Scroll from '../../common/Scroll'
// 聊天框
import Message from '../Message'
const ChatBoxStyle = styled.div`
    position:absolute;
    left:0;
    right:0;
    bottom:3rem;
    top:3.5rem;
    overflow:scroll;
    background-color:#f5f5f5;
`
export const ChatBox = (props) => {
    const scroll = useRef(null)
    // 数据结构对象应该是 [{type:1||2?,nickName,date,messageValue,messageType,avator }]
    const { messageList = [] } = props;
    const { handleClick = () => { } } = props;
    useEffect(() => {
        if (scroll) {
            const bscroll = scroll.current.getBScroll()
            if (bscroll) {
                scroll.current.refresh()
                bscroll.scrollTo(0, bscroll.maxScrollY)
            }
        }
    }, [messageList])
    // 监听键盘弹起
    useEffect(() => {
        // 保持弹起
        window.onresize = () => {
            if (scroll) {
                const bscroll = scroll.current.getBScroll()
                if (bscroll) {
                    scroll.current.refresh()
                    bscroll.scrollTo(0, bscroll.maxScrollY)
                }
            }
        }
    })
    return (
        <ChatBoxStyle>
            <Scroll ref={scroll}>
                <div
                    onClick={() => {
                        handleClick();
                    }}>
                    {
                        messageList.map((item, index) => (<Message handleImgLoaded={() => {
                            // 加载后刷新scroll对象
                            if (scroll) {
                                scroll.current.refresh()
                                const bscroll = scroll.current.getBScroll();
                                if (bscroll) {
                                    bscroll.scrollTo(0, bscroll.maxScrollY)
                                }
                            }
                        }
                        }
                            type={item.type}
                            nickName={item.nickName}
                            date={item.date}
                            messageType={item.messageType}
                            messageValue={item.messageValue}
                            avator={item.avator}
                            key={index} />))
                    }
                </div>
            </Scroll>
        </ChatBoxStyle>

    )
}

export default React.memo(ChatBox)