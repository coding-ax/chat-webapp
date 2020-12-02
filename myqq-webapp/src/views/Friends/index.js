import React, { useEffect, useState } from 'react'
// 组件
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import Transition from '../../components/common/Transition'
import AddFriends from '../AddFriends'
import Friend from '../../components/context/Friend'
//redux和数据操作方法
import { getFriendShip } from '../../store/socketHandle/action'
import { connect } from 'react-redux'
//css
import { FriendList, FriendContain } from './style'
const Friends = (props) => {
    const { socket, friendList } = props;
    const [show, setShow] = useState(false)
    // console.log(props)
    useEffect(() => {
        if (socket) {
            getFriendShip(socket);
        }
    }, [socket])
    return (
        <FriendContain>
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
            <h3>新朋友：</h3>
            {/**请求的好友列表 */}
            <FriendList>
                {
                    friendList.adding.length ?
                        friendList.adding.map(item => (<Friend key={item.friendID}
                            avator={item.avator}
                            desc={item.signature}
                            nickName={item.nickName}
                            xlinkHref={item.sender===item.userID?"#icon-qianming":"#icon-xiugai"}
                            handleIconClick={() => {

                            }}
                        ></Friend>)) : (<div className="desc-friend">暂时没有新好友请求</div>)
                }
            </FriendList>
            {/**朋友列表 */}
            <h3>好友列表：</h3>
            <FriendList>
                {
                    friendList.added.length ?
                        friendList.added.map(item => (<Friend key={item.friendID}
                            avator={item.avator}
                            desc={item.signature}
                            nickName={item.nickName}
                            handleIconClick={() => {

                            }}
                            xlinkHref={"#icon-liaotian"}
                        ></Friend>)) : (<div className="desc-friend">无好友，快点击右上角添加好友吧！</div>)
                }
            </FriendList>
            {/**提示框 */}

            {/**添加页面 */}
            <Transition show={show}>
                <AddFriends onExit={() => {
                    setShow(false)
                }}></AddFriends>
            </Transition>
        </FriendContain>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket,
        friendList: state.HomeReducer.friendList
    }
}
export default connect(mapStateToProps)(React.memo(Friends));
