import React from 'react'
// 导入组件
import Avator from '../../common/Avator'
import { MessageContain, UserContain } from './style'
const UserDetail = (props) => {
    const { nickName, userName, imgSrc } = props;
    return (
        <UserContain>
            <div style={{ width: '15%', margin: '5% 2.5%' }}>
                <Avator imgSrc={imgSrc}></Avator>
            </div>
            <MessageContain style={{ width: '80%' }}>
                <div className="title">{nickName}</div>
                <div className='number'>mq号：<span>{userName}</span></div>
            </MessageContain>
        </UserContain>
    )
}
export default React.memo(UserDetail)