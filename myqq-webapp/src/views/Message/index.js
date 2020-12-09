import React, { useState } from 'react'

// 组件
import Transition from '../../components/common/Transition'
import Chat from '../Chat'
import Nav from '../../components/common/Nav'


const Message = (props) => {
    const [show, setShow] = useState(false);
    return (
        <div>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>信息</span>
                <span></span>
            </Nav>
            <button onClick={() => {
                setShow(!show)
            }}>change</button>
            <Transition show={show} >
                <Chat onExit={() => {
                    setShow(false)
                }}></Chat>
            </Transition>
        </div>
    )
}
export default Message;
