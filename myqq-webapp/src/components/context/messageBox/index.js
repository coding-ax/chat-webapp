import React from 'react'
import Icon from '../Icon'
import styled from 'styled-components'
const MessageContain = styled.div`
    width:90%;
    margin:0% 2.5%;
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
    background-color:#fff;
    padding:3%;
    border-bottom:#f5f5f5 solid 1px;
    &>*{
        margin-right:2.5%;
        display:flex;
        flex-direction:row;
        align-items:center;
    }
    .content{
        font-size:0.9rem;
        color:#888;
        overflow:hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`
const MessageBox = (props) => {
    const { title, xlinkHref } = props;
    return (
        <MessageContain>
            <span>
                <Icon xlinkHref={xlinkHref} size="1.5rem"></Icon>
                <span >{title}:</span>
            </span>
            <span className='content'>{props.children}</span>
        </MessageContain>
    )
}
export default React.memo(MessageBox)