import React, { useState } from 'react'

// 组件
import Transition from '../../components/common/Transition'
import Chat from '../Chat'
import Nav from '../../components/common/Nav'
import Friend from '../../components/context/Friend'
import styled from 'styled-components'
const FriendList = styled.div`

`

const Message = (props) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>信息</span>
                <span></span>
            </Nav>
            {/**消息列表*/}
            <FriendList>
                {
                    [1, 2, 3, 4].map(item => (<Friend
                        key={item}
                        xlinkHref={"#icon-liaotian"}
                    />))
                }
            </FriendList>

            {/**聊天框 */}
            <Transition show={show} >
                <Chat onExit={() => {
                    setShow(false)
                }}></Chat>
            </Transition>
        </div>
    )
}
export default Message;
