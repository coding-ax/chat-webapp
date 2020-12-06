import React from 'react'
import Nav from '../../components/common/Nav'

import Chat from '../Chat'
const Message = (props) => {
    return (
        <div>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>信息</span>
                <span></span>
            </Nav>
            <Chat></Chat>
        </div>
    )
}
export default Message;
