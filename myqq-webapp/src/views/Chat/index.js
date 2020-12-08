import React from 'react'
import styled from 'styled-components'
import Input from '../../components/context/Input'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
const ChatStyle = styled.div`
    background-color:#f5f5f5;  
`
export const Chat = (props) => {

  return (
    <ChatStyle>
      <Nav>
        <span>
          <Icon xlinkHref="#icon-houtui" size={"1.5rem"}></Icon>
        </span>
        <span>对方昵称</span>
        <span></span>
      </Nav>
      <Input re></Input>
    </ChatStyle>
  )
}

export default Chat