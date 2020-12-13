import React from 'react'
import styled from 'styled-components'
const SelfMessageStyle = styled.div`
    margin-top:3%;  
    width:100vw;
    display:flex;
    flex-direction:row;
    justify-content:flex-start;
`
const DescBox = styled.div`
    display:flex;
    width:100%;
    flex-direction:column;
    justify-content:center;
    word-break:break-all;
    align-items:flex-start;
`
const MessageBox = styled.div`
    position:relative;
    left:0.8rem;
    background-color:#FFCD00;
    display:block;  
    margin-top:2%;
    min-height:2rem;
    min-width:2rem;
    max-width:70%;
    border-radius:0.5rem;
    padding:2%;
    &::before{
        content:"";
        height:0;  
        width: 0;  
        position:absolute;
        left:-1.5rem;
        top:-0.3rem;
        transform:rotate(105deg);
        z-index:-1;
        border-top: 1rem solid  #FFCD00;  
        border-left: 1rem solid transparent;  
        border-right: 1rem solid transparent;
        border-bottom:1rem solid transparent;
    }
`

const Avator = styled.img`
    width:2.7rem;
    height:2.7rem;
    border-radius:0.3rem;
`
const MessageTitle = styled.div`
    text-align:left;
    width:98%;
    color:#888;
    margin-right:2%;
`
const DateTitle = styled.div`
    text-align:left;
    width:98%;
    color:#888;
    font-size:0.2rem;
    margin-right:2%;
`
export const OtherMessgae = (props) => {
    const { nickName = "", date = "", messageValue = "", avator = "https://xgpax.top/wp-content/uploads/2020/08/head.png" } = props;
    const { handleImgLoaded = () => { } } = props;
    return (
        <SelfMessageStyle>
            <Avator src={avator} onload={() => {
                handleImgLoaded();
            }} ></Avator>
            <DescBox>
                <MessageTitle>{nickName}</MessageTitle>
                <DateTitle>{date}</DateTitle>
                <MessageBox>
                    {messageValue}
                </MessageBox>
            </DescBox>
        </SelfMessageStyle>
    )
}

export default React.memo(OtherMessgae)