import React, { useEffect, useState } from 'react'
// 组件
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import Transition from '../../components/common/Transition'
import AddFriends from '../AddFriends'
//redux和数据操作方法
import { getFriendShip } from '../../store/socketHandle/action'
import { connect } from 'react-redux'

const Friends = (props) => {
    const { socket } = props;
    const [show, setShow] = useState(false)
    useEffect(() => {
        if (socket) {
            getFriendShip(socket);
        }
    }, [socket])
    return (
        <div style={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
            {/**nav状态 */}
            <Nav>
                <span></span>
                <span>朋友</span>
                <span onClick={() => {
                    setShow(true)
                }} style={{ position: 'relative', right: '1rem' }}>
                    <Icon xlinkHref="#icon-add" size={"1.8rem"}></Icon>
                </span>
            </Nav>

            <Transition show={show}>
                <AddFriends onExit={()=>{
                    setShow(false)
                }}></AddFriends>
            </Transition>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket
    }
}
export default connect(mapStateToProps)(React.memo(Friends));
