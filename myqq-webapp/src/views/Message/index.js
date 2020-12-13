import React, { useState, useEffect } from 'react'

// 组件
import Transition from '../../components/common/Transition'
import Chat from '../Chat'
import Nav from '../../components/common/Nav'
import Friend from '../../components/context/Friend'
import styled from 'styled-components'
// redux
import { useSelector } from 'react-redux'
import { getUserDetailByUserIDs } from '../../store/socketHandle/action'
const FriendList = styled.div`

`

const Message = (props) => {
    const [show, setShow] = useState(false);
    // 导入unreadmessagelist
    const unReadMessageList = useSelector(store => store.ChatReducer.unReadMessageList)
    // 进行数据处理
    const socket = useSelector(store => store.HomeReducer.socket)
    useEffect(async () => {
        let set = new Set();
        const userIDs = unReadMessageList.filter(item => {
            let flag = set.has(item.dispatcher)
            set.add(item.dispatcher)
            return flag;
        })
        console.log(userIDs)
        if (userIDs.length) {
            getUserDetailByUserIDs(socket, userIDs)
        }
        // eslint-disable-next-line
    }, unReadMessageList)
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
