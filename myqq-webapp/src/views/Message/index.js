import React from 'react'
import Nav from '../../components/common/Nav'
const Message = (props) => {
    return (
        <div>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>信息</span>
                <span></span>
            </Nav>
            Message
        </div>
    )
}
export default Message;
