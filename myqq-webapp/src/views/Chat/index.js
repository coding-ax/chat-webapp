import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../../components/context/Input'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import ChatBox from '../../components/context/chatBox'
import dayjs from 'dayjs'
// 导入redux
import { useSelector } from 'react-redux'
// 导入控制数据流方法
import { getTargetChatMessage, chat2target } from '../../store/socketHandle/action'
let calendar = require('dayjs/plugin/calendar')
require('dayjs/locale/zh-cn')
dayjs.extend(calendar)
dayjs.locale('zh-cn')
const ChatStyle = styled.div`
      
`
export const Chat = (props) => {
  const { onExit } = props
  const { targetAvator = "", targetNickname = "" } = props;
  // 获取chat信息
  // 获取chatStore 直接使用redux
  // 获取target
  const target = useSelector(store => store.ChatReducer.target)
  // 获取socket
  const socket = useSelector(store => store.HomeReducer.socket)
  // 获取头像
  const avator = useSelector(store => store.HomeReducer.userInfo.avator)
  // 获取聊天记录
  const messageList = useSelector(store => store.ChatReducer.messageList)
  // 针对messageList处理
  const messageListAfterHandle = messageList.map(item => ({
    ...item,
    // 解码messageList
    messageValue: window.decodeURIComponent(window.atob(item.messageValue)),
    date: dayjs(item.date).calendar(null, {
      sameDay: '今天Ah:mm', // The same day ( Today at 2:30 AM )
      nextDay: '明天Ah:mm', // The next day ( Tomorrow at 2:30 AM )
      nextWeek: '下周Ah:mm', // The next week ( Sunday at 2:30 AM )
      lastDay: '昨天Ah:mm', // The day before ( Yesterday at 2:30 AM )
      lastWeek: '上周dAh:mm', // Last week ( Last Monday at 2:30 AM )
      sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
    }),
    type: item.recevier === target ? 1 : 2,
    nickName: targetNickname,
    avator: item.recevier === target ? avator : targetAvator
  }))
  useEffect(() => {
    if (target) {
      // 获取聊天记录
      getTargetChatMessage(socket, target)
    }
    return () => {

    }
  }, [target, socket])
  const ref = useRef(null)
  return (
    <ChatStyle>
      {/**导航条 */}
      <Nav>
        <span onClick={() => {
          if (onExit) onExit();
        }}>
          <Icon xlinkHref="#icon-houtui" size={"1.5rem"}></Icon>
        </span>
        <span>{targetNickname}</span>
        <span></span>
      </Nav>

      {/**消息显示 */}
      <ChatBox messageList={messageListAfterHandle}></ChatBox>
      {/**输入框 */}
      <Input ref={ref} handleValue={
        value => {
          // 发送消息
          chat2target(socket, target, {
            type: 1,
            value
          })
          // 
        }}
        handleImage={file => {
          console.log(file);
        }
        } ></Input>
    </ChatStyle>
  )
}

export default Chat