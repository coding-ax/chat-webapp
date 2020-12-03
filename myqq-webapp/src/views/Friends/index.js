import React, { useEffect, useState } from 'react'
// 组件
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import Transition from '../../components/common/Transition'
import AddFriends from '../AddFriends'
import Friend from '../../components/context/Friend'
import Toast from '../../components/common/Toast'
import Dialog from '../../components/common/Dialog'
//redux和数据操作方法
import { getFriendShip, getAgreeFriend, getDeleteFriend } from '../../store/socketHandle/action'
import { connect } from 'react-redux'
//css
import { FriendList, FriendContain } from './style'
const Friends = (props) => {
    const { socket, friendList } = props;
    const [show, setShow] = useState(false)
    const [openToast, setOpenToast] = useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [content, setContent] = useState('')
    // 设置当前操作的target
    const [target, setTarget] = useState('')
    // 定义setToast方法用于显示
    const setToast = (content) => {
        setOpenToast(true);
        setContent(content)
        setTimeout(() => {
            setOpenToast(false)
        }, 1000);
    }
    // 获取朋友清单
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
                            xlinkHref={item.sender === item.userID ? "#icon-status_wating" : "#icon-xiugai"}
                            handleIconClick={() => {
                                if (item.sender === item.userID) {
                                    setToast('等待对方确认中')
                                } else {
                                    setTarget(item.friendID)
                                    setOpenDialog(true)
                                }
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
            <div style={{ display: "flex", justifyContent: "center", textAlign: "center", width: "100%" }}>
                <Toast content={content} open={openToast}></Toast>
            </div>
            <Dialog open={openDialog}
                title={'好友确认'}
                needCheck={true}
                buttonDesc={['同意', '拒绝']}
                onExit={() => {
                    setOpenDialog(false)
                }}
                onConfirm={() => {
                    // 通过申请
                    getAgreeFriend(socket, target)
                    setOpenDialog(false)
                }}
                onCancel={() => {
                    // 拒绝申请
                    getDeleteFriend(socket, target)
                    setOpenDialog(false)
                }}
            >
                <div>是否通过申请?</div>
            </Dialog>
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
