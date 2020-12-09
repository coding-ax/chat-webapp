import React, { useRef } from 'react'
import styled from 'styled-components'
import Input from '../../components/context/Input'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import ChatBox from '../../components/context/chatBox'
const ChatStyle = styled.div`
      
`
export const Chat = (props) => {
  const { onExit } = props
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
        <span>对方昵称</span>
        <span></span>
      </Nav>

      {/**消息显示 */}
      <ChatBox></ChatBox>
      {/**输入框 */}
      <Input ref={ref}></Input>
    </ChatStyle>
  )
}

export default Chat