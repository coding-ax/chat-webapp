import React from 'react'
import UserDetail from '../../components/context/userDetail'
import MessageBox from '../../components/context/messageBox'
import Icon from '../../components/context/Icon'
const Config = (props) => {
    return (<div>
        <UserDetail nickName="暮雪离歌" userName='xgp'></UserDetail>
        <MessageBox title="个性签名" xlinkHref='#icon-qianming1' >
            <span>你步履匆忙，来不及疲倦</span>
        </MessageBox>
        <MessageBox title="性别" xlinkHref="#icon-xingbie1"  >
            <Icon size={'1.5rem'} xlinkHref='#icon-nv'></Icon>
        </MessageBox>
        <MessageBox title="生日" xlinkHref='#icon-shengri' >
            <span>2000-09-08</span>
        </MessageBox>
    </div>)
}
export default React.memo(Config)