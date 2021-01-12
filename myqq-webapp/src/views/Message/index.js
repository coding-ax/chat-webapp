import React, { useState, useMemo } from 'react'

// 组件
import Transition from '../../components/common/Transition'
import Chat from '../Chat'
import Nav from '../../components/common/Nav'
import Friend from '../../components/context/Friend'
import styled from 'styled-components'
// redux
import { useSelector, useDispatch } from 'react-redux'
import { actionCreator } from '../Chat/store'
import Icon from '../../components/context/Icon'
const FriendList = styled.div`
    .show-box{
        width:100%;
        height:50vh;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        .desc-box{
            color:#888;
        }
    }
`

const Message = (props) => {
    // 设置state
    const [show, setShow] = useState(false);
    const [avator, setAvator] = useState('https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png')
    const [nickname, setNickname] = useState('')
    const dispatch = useDispatch();
    // 设置显示的数据

    const target = useSelector(store => store.ChatReducer.target)
    const unReadMessageList = useSelector(store => store.ChatReducer.unReadMessageList)
    // 修改为useMemo的data
    const fakeData = useMemo(() => {
        const data = []
        for (const item in unReadMessageList) {
            data.push(unReadMessageList[item])
        }
        return data
    }, [unReadMessageList])
    // 获取当前聊天
    const messageList = useSelector(store => store.ChatReducer.messageList)
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
                        handleIconClick={() => {
                            // 分发target改变
                            dispatch(actionCreator.targetChange(item.userID))
                            // 传入头像
                            setAvator(item.avator)
                            // 传入nickname
                            setNickname(item.nickName)
                            setShow(true)
                        }}
                    />))) : (<div className="show-box">
                        <Icon xlinkHref={"#icon-A"} size={"8rem"} />
                        <div className="desc-box">暂时没有新消息噢</div>
                    </div>)
                }
            </FriendList>

            {/**聊天框 */}
            <Transition show={show} >
                <Chat
                    targetAvator={avator}
                    targetNickname={nickname}
                    onExit={() => {
                        dispatch(actionCreator.targetChange(''))
                        // 清除消息，更新message
                        dispatch(actionCreator.countChange({ target, count: 0 }))
                        dispatch(actionCreator.messageChange({
                            target,
                            lastMessage: messageList[messageList.length - 1].messageValue,
                            messageType: messageList[messageList.length - 1].messageType,
                        }))
                        setShow(false)
                    }}></Chat>
            </Transition>
        </div>
    )
}
export default React.memo(Message)
