import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import Input from '../../components/context/Input'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import ChatBox from '../../components/context/chatBox'
import dayjs from 'dayjs'
// 导入redux
import { useSelector, useDispatch } from 'react-redux'
// 导入控制数据流方法
import { getTargetChatMessage, chat2target } from '../../store/socketHandle/action'
import { actionCreator } from './store'
// 导入七牛云
import { file2qiniuCloud } from '../../api/HomeRequest'
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
  // 获取自己的id
  const userID = useSelector(store => store.HomeReducer.userInfo.userID)
  // 获取自己的名称
  const nickName = useSelector(store => store.HomeReducer.userInfo.nickName)
  // 获取token
  const token = useSelector(store => store.LoginReducer.token)
  // 分发
  const dispatch = useDispatch();
  // 针对messageList处理
  const messageListAfterHandle = messageList.map(item => ({
    ...item,
    // 针对文字解码messageList
    // eslint-disable-next-line
    messageValue: item.messageType == "1" ? window.decodeURIComponent(window.atob(item.messageValue)) : item.messageValue,
    date: dayjs(item.date).calendar(null, {
      sameDay: '今天Ah:mm', // The same day ( Today at 2:30 AM )
      nextDay: '明天Ah:mm', // The next day ( Tomorrow at 2:30 AM )
      nextWeek: '下周Ah:mm', // The next week ( Sunday at 2:30 AM )
      lastDay: '昨天Ah:mm', // The day before ( Yesterday at 2:30 AM )
      lastWeek: '上周dAh:mm', // Last week ( Last Monday at 2:30 AM )
      sameElse: 'DD/MM/YYYY' // Everything else ( 7/10/2011 )
    }),
    type: item.recevier === target ? 1 : 2,
    nickName: item.recevier === target ? nickName : targetNickname,
    avator: item.recevier === target ? avator : targetAvator
  }))
  useEffect(() => {
    if (target) {
      // 获取聊天记录
      getTargetChatMessage(socket, target)
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
          // 构造数据添加
          const data = {
            date: new Date(),
            dispatcher: userID,
            messageType: "1",
            // 进行base64编码
            messageValue: window.btoa(window.encodeURIComponent(value)),
            recevier: target
          }
          // 分发
          dispatch(actionCreator.addMessageList(data))
        }}
        handleImage={async file => {
          // 先上传
          const url = await file2qiniuCloud(token, file[0]);
          chat2target(socket, target, {
            type: 2,
            value: url
          });
          // 分发
          const data = {
            date: new Date(),
            dispatcher: userID,
            messageType: "2",
            // 进行base64编码
            messageValue: url,
            recevier: target
          }
          dispatch(actionCreator.addMessageList(data))
        }
        } ></Input>
    </ChatStyle>
  )
}

export default Chat