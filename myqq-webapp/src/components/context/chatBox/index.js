import React, { useRef } from 'react'
import styled from 'styled-components'
import Scroll from '../../common/Scroll'
// 聊天框
import Message from '../Message'
const ChatBoxStyle = styled.div`
    /* height:calc(100vh - 6rem); */
    position:absolute;
    left:0;
    right:0;
    top:3.5rem;
    bottom:3rem;
    overflow:scroll;
    background-color:#f5f5f5;
`
export const ChatBox = (props) => {
    const scroll = useRef(null)
    // 数据结构对象应该是 [{type:1||2?,nickName,date,messageValue,messageType,avator }]
    const {messageList=[]} = props; 
    return (
        <ChatBoxStyle>
            <Scroll ref={scroll}>
                <div>
                    {
                        messageList.map((item, index) => (<Message handleImgLoaded={() => {
                            // 加载后刷新scroll对象
                            scroll.current.refresh()
                            // console.log(scroll)
                        }
                        }
                            type={item.type}
                            nickName={item.nickName}
                            date={item.date}
                            messageType={item.messageType}
                            messageValue={item.messageValue}
                            avator={item.avator}
                            handleImgLoaded={item.handleImgLoaded}
                            key={index} />))
                    }
                </div>
            </Scroll>
        </ChatBoxStyle>

    )
}

export default React.memo(ChatBox)