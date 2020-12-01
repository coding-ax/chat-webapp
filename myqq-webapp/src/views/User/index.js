import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'

// 组件
import UserDetail from '../../components/context/userDetail'
import MessageBox from '../../components/context/messageBox'
import Icon from '../../components/context/Icon'
import Nav from '../../components/common/Nav'
import Transition from '../../components/common/Transition'
import EditPage from '../EditPage'
// styled
import styled from 'styled-components'
import { connect } from 'react-redux'
import { getDetail } from '../../store/socketHandle/action'
const BottomButton = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   margin-top: 10vh;
   color: #0078D7;
   text-decoration:underline;
   font-size:1.1rem;
`
const Config = (props) => {
    const [show, setShow] = useState(false)
    const { socket } = props;
    const { userInfo } = props;
    // history
    const { history } = props;

    // 连接后就马上请求信息
    useEffect(() => {
        if (socket) {
            getDetail(socket)
        }
    }, [socket])



    return (
        <div>
            {/**导航栏 */}
            <Nav>
                <span onClick={() => {
                    history.goBack();
                }}> <Icon size={'1.5rem'} xlinkHref="#icon-houtui"></Icon></span>
                <span>设置</span>
                <span></span>
            </Nav>
            {/** 信息显示 */}
            <div>
                {/**头像区域 */}
                <UserDetail nickName={userInfo.nickName} imgSrc={userInfo.avator} userName={userInfo.userID}></UserDetail>
                {/**信息显示区域 */}
                <MessageBox title="个性签名" xlinkHref='#icon-qianming1' >
                    <span>{userInfo.signature}</span>
                </MessageBox>
                <MessageBox title="性别" xlinkHref="#icon-xingbie1"  >
                    <Icon size={'1.5rem'} xlinkHref={String(userInfo.gender) === "0" ? '#icon-nv' : '#icon-xingbie'}></Icon>
                </MessageBox>
                <MessageBox title="生日" xlinkHref='#icon-shengri' >
                    <span>{new Date(userInfo.birthday).toLocaleDateString()}</span>
                </MessageBox>
                {/** bottom设置修改资料框的跳出*/}
                <BottomButton>
                    <span onClick={() => {
                        setShow(true)
                    }}>修改资料</span>
                </BottomButton>
            </div>

            {/**信息设置 */}
            <Transition show={show}>
                <EditPage onExit={() => {
                    setShow(false)
                }}></EditPage>
            </Transition>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket,
        userInfo: state.HomeReducer.userInfo
    }
}
export default connect(mapStateToProps)(React.memo(withRouter(Config))) 