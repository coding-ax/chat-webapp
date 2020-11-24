import React from 'react'
// 导入组件
import styled from 'styled-components'
import Avator from '../../common/Avator'
const UserContain = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
`;
const MessageContain = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:left;
.title{
    font-size:1.3rem;
    font-weight:700;
}
.number{
    font-size:0.9rem;
    margin-top:0.2rem;
    span{
        color:#888888;
    }
}
`
const UserDetail = (props) => {
    const { nickName, userName } = props;
    return (
        <UserContain>
            <div style={{ width: '15%', margin: '5% 2.5%' }}>
                <Avator ></Avator>
            </div>
            <MessageContain style={{ width: '80%' }}>
                <div className="title">{nickName}</div>
                <div className='number'>mq号：<span>{userName}</span></div>
            </MessageContain>
        </UserContain>
    )
}
export default React.memo(UserDetail)