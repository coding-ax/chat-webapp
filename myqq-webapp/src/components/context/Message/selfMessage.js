import React from 'react'
import styled from 'styled-components'
const SelfMessageStyle = styled.div`
    width:100vw;
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
`
const DescBox = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    justify-content:center;
    word-break:break-all;
    align-items:flex-end;
`
const MessageBox = styled.div`
    position:relative;
    left:-0.8rem;
    background-color:#FFCD00;
    display:block;  
    margin-top:2%;
    min-height:2rem;
    min-width:2rem;
    max-width:70%;
    border-radius:0.5rem;
    padding:2%;
    &::after{
        content:"";
        height:0;  
        width: 0;  
        position:absolute;
        left:97%;
        top:0.2rem;
        transform:rotate(-93deg);
        z-index:-1;
        border-top: 0.7rem solid #FFCD00;  
        border-left: 0.7rem solid transparent;  
        border-right: 0.7rem solid transparent;
        border-bottom:0.7rem solid transparent;
    }
`

const Avator = styled.img`
    width:2.7rem;
    height:2.7rem;
    border-radius:0.3rem;
`
const MessageTitle = styled.div`
    text-align:right;
    width:98%;
    color:#888;
    margin-right:2%;
`
const DateTitle = styled.div`
    text-align:right;
    color:#888;
    width:98%;
    font-size:0.2rem;
    margin-right:2%;
`
export const SelfMessgae = (props) => {
    // 显示状态
    const { nickName = "", date = "", messageValue = "", avator = "https://xgpax.top/wp-content/uploads/2020/08/head.png", messageType = 1 } = props;
    const { handleImgLoaded = () => { } } = props;
    return (
        <SelfMessageStyle>
            <DescBox>
                <MessageTitle>{nickName}</MessageTitle>
                <DateTitle>{date}</DateTitle>
                <MessageBox>
                    {messageValue}
                </MessageBox>
            </DescBox>
            <Avator src={avator} onload={() => {
                handleImgLoaded();
            }} ></Avator>
        </SelfMessageStyle>
    )
}

export default React.memo(SelfMessgae)