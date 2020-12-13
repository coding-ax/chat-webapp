import React from 'react'
import styled from 'styled-components'
import SelfMessage from './selfMessage'
import OtherMessage from './otherMessage'
const MessageStyle = styled.div`


`
export const Message = (props) => {
    // type=1:自己发的 type=2别人发的
    const { type = 1, nickName = "", date = "", messageValue = "", avator = "https://xgpax.top/wp-content/uploads/2020/08/head.png", messageType = "1" } = props;
    const { handleImgLoaded } = props;
    return (
        <MessageStyle>
            {
                type === 1 ? <SelfMessage
                    nickName={nickName}
                    date={date}
                    messageType={messageType}
                    messageValue={messageValue}
                    avator={avator}
                    handleImgLoaded={handleImgLoaded}
                /> : <OtherMessage
                        nickName={nickName}
                        date={date}
                        messageType={messageType}
                        messageValue={messageValue}
                        avator={avator}
                        handleImgLoaded={handleImgLoaded}
                    />
            }
        </MessageStyle>
    )
}

export default React.memo(Message)