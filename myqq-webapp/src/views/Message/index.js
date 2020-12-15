import React, { useState } from 'react'

// 组件
import Transition from '../../components/common/Transition'
import Chat from '../Chat'
import Nav from '../../components/common/Nav'
import Friend from '../../components/context/Friend'
import styled from 'styled-components'
// redux
import { useSelector } from 'react-redux'
const FriendList = styled.div`

`
// 通过该方法转换数据
/**
 * 进行数据转换
 * @param {Array} unReadList
 */
const Message = (props) => {
    const [show, setShow] = useState(false);
    // const mockData = [{
    //     avator: 'https://img.xgpax.top/Sun Dec 13 2020 19:30:03 GMT+0800 (GMT+08:00)224568e4fbccf',
    //     lastMessage: '我是一条测试数据',
    //     nickname: '测试昵称',
    //     date: new Date().toLocaleTimeString(),
    //     count: 1
    // }]
    const fakeData = []
    const unReadMessageList = useSelector(store => store.ChatReducer.unReadMessageList)
    for (const item in unReadMessageList) {
        console.log(unReadMessageList[item]);
        fakeData.push(unReadMessageList[item])
    }
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
                    fakeData.length ? (fakeData.map(item => (<Friend
                        key={item.userID}
                        nickName={item.nickName}
                        // eslint-disable-next-line 
                        desc={(item.count > 0 ? `[有${item.count}条新消息]` : '') + (item.messageType == "1" ? window.decodeURIComponent(window.atob(item.lastMessage)) : "图片")}
                        avator={item.avator}
                        xlinkHref={"#icon-liaotian"}
                    />))) : (<span>暂无消息</span>)
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
export default React.memo(Message)
