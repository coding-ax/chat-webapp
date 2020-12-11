import React from 'react'
import styled from 'styled-components'
import SelfMessage from './selfMessage'
import OtherMessage from './otherMessage'
const MessageStyle = styled.div`


`
export const Message = (props) => {
    // type=1:自己发的 type=2别人发的
    const { type = 1 } = props;
    return (
        <MessageStyle>
            {
                type === 1 ? <SelfMessage /> : <OtherMessage />
            }
        </MessageStyle>
    )
}

export default React.memo(Message)