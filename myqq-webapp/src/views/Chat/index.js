import React from 'react'
import styled from 'styled-components'
const ChatStyle = styled.div`
.chat__content {
  height: calc(100% - 40px);
  margin-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;
}

.input__content {
  display: flex;
  height: 40px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 80px;
  align-items: center;
}
.input{
    background-color:#000;
    width:100vw;
    height:10vh;
    color:#fff;
}
`
export const Chat = (props) => {
    return (
        <ChatStyle>
            
        </ChatStyle>
    )
}

export default Chat