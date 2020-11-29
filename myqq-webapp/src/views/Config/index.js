import React, { useEffect } from 'react'
import UserDetail from '../../components/context/userDetail'
import MessageBox from '../../components/context/messageBox'
import Icon from '../../components/context/Icon'
import Nav from '../../components/common/Nav'
import styled from 'styled-components'
import { connect } from 'react-redux'
const BottomButton = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 3vh;
   color: #0078D7;
   text-decoration:underline;
   font-size:1.1rem;
`
const Config = (props) => {
    const { socket } = props;
    // eslint-disable-next-line
    const { userInfo } = props;
    useEffect(() => {
        if (socket) {
            socket.emit('getDetail', {});
        } else {
            console.log('error,socket为null')
        }
        // }, [socket,message])
    }, [socket])
    return (
        <div>
            {/**导航栏 */}
            <Nav>
                <span></span>
                <span>设置</span>
                <span></span>
            </Nav>
            {/**头像区域 */}
            <UserDetail nickName={userInfo.nickName} imgSrc={userInfo.avator} userName={userInfo.nickName}></UserDetail>
            {/**信息显示区域 */}
            <MessageBox title="个性签名" xlinkHref='#icon-qianming1' >
                <span>{userInfo.signature}</span>
            </MessageBox>
            <MessageBox title="性别" xlinkHref="#icon-xingbie1"  >
                <Icon size={'1.5rem'} xlinkHref={userInfo.gender === 0 ? '#icon-nv' : '#icon-xingbie'}></Icon>
            </MessageBox>
            <MessageBox title="生日" xlinkHref='#icon-shengri' >
                <span>{new Date(userInfo.birthday).toLocaleDateString()}</span>
            </MessageBox>
            {/** bottom设置跳转*/}
            <BottomButton>
                <span>修改资料</span>
            </BottomButton>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket,
        userInfo: state.HomeReducer.userInfo
    }
}
export default connect(mapStateToProps)(React.memo(Config)) 