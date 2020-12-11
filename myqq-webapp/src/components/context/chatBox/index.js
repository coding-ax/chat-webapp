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
    return (
        <ChatBoxStyle>
            <Scroll ref={scroll}>
                <div>
                    {
                        new Array(100).fill({ type: 0 }).map((item, index) => (<Message handleImgLoaded={() => {
                            // 加载后刷新scroll对象
                            scroll.current.refresh()
                        }
                        }
                            type={Math.floor(Math.random() * 2 + 1)}
                            key={index} />))
                    }
                </div>
            </Scroll>
        </ChatBoxStyle>

    )
}

export default React.memo(ChatBox)