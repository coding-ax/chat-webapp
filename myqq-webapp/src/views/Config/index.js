import React from 'react'
import UserDetail from '../../components/context/userDetail'
import MessageBox from '../../components/context/messageBox'
import Icon from '../../components/context/Icon'
import Nav from '../../components/common/Nav'
import styled from 'styled-components'
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
    return (
        <div>
            {/**导航栏 */}
            <Nav>
                <span></span>
                <span>设置</span>
                <span></span>
            </Nav>
            {/**头像区域 */}
            <UserDetail nickName="暮雪离歌" userName='xgp'></UserDetail>
            {/**信息显示区域 */}
            <MessageBox title="个性签名" xlinkHref='#icon-qianming1' >
                <span>你步履匆忙，来不及疲倦</span>
            </MessageBox>
            <MessageBox title="性别" xlinkHref="#icon-xingbie1"  >
                <Icon size={'1.5rem'} xlinkHref='#icon-nv'></Icon>
            </MessageBox>
            <MessageBox title="生日" xlinkHref='#icon-shengri' >
                <span>2000-09-08</span>
            </MessageBox>
            {/** bottom设置跳转*/}
            <BottomButton>
                <span>修改资料</span>
            </BottomButton>
        </div>
        )
}
export default React.memo(Config)