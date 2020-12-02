import React from 'react'

//导入组件
import Avator from '../../common/Avator'
import Icon from '../../context/Icon'
import styled from 'styled-components'
const FriendStyle = styled.div`
    width:95%;
    padding:2.5%;
    .contain{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        width:100%;
    }
    .avator{
        width:30%;
        display:flex;
        /* flex-direction:row;
        justify-content:center;
        align-items:center; */
    }
    .title-box{
        width:70%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        /* align-items:center; */
        .title{
           font-size:1.5rem;
        }
        .desc{
            overflow: hidden;
             /*文本不会换行*/
            white-space: nowrap;
            /*当文本溢出包含元素时，以省略号表示超出的文本*/
            text-overflow: ellipsis;
            color:#888;
            font-size:0.8rem;
        }
    }
    .operation{
            position:relative;
            right:0.5rem;   
    }

`
export const Friend = (props) => {
    const { nickName = "无昵称", desc = "这个人很懒，没有个性签名", avator = 'https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png' } = props;
    const { needIcon = true, xlinkHref = '#icon-tianjia' } = props;
    const { handleClick, handleIconClick } = props;
    return (
        <FriendStyle>
            <div className='contain' onClick={() => {
                if (handleClick) handleClick();
            }}>
                <div className="avator">
                    <Avator size={3.7} imgSrc={avator}></Avator>
                </div>
                <div className="title-box">
                    <div className='title'>{nickName}</div>
                    <div className='desc'>{desc}</div>
                </div>
                <div className="operation" 
                    style={{ visibility: needIcon ? "visible" : "hidden" }}
                    onClick={() => {
                        if (handleIconClick) handleIconClick();
                    }}>
                    <Icon xlinkHref={xlinkHref}></Icon>
                </div>
            </div>
        </FriendStyle>
    )
}

export default React.memo(Friend) 