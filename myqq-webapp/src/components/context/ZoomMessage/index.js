import React from 'react'
import styled from 'styled-components'
const ZoomMessageStyle = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    box-sizing:border-box;
    padding:0.3rem;
    overflow-x:hidden;
    .avator-box{
        display:flex;
        flex-direction:row;
        padding-bottom:0.5rem;
        img{
            width:3rem;
            height:3rem;
            border-radius:50%;
        }
        .avator-box-title{
            position:relative;
            left:0.3rem;
             .avator-box-nickname{
                 font-size:1.5rem;
             }
             .avator-box-date{
                 font-size:0.7rem;
                 color:#888;
             }
        }
    }
    .desc-box{
        display:flex;
        flex-direction:column;
        
        .desc-text{
            font-size:0.9rem;
        }
        .img-box{
            width:100%;
            img{
                box-sizing:border-box;
                padding:0.3rem;
                min-width:30%;
                max-width:49%;
            }
        }
    }
`
export const ZoomMessage = (props) => {
    const { avator, content, nickName, date } = props;

    return (
        <ZoomMessageStyle>
            <div className='avator-box'>
                {/**头像盒子 */}
                <img src={avator} alt="" />
                <div className='avator-box-title'>
                    <div className='avator-box-nickname'>{nickName}</div>
                    <div className='avator-box-date'>{date}</div>
                </div>
            </div>
            <div className="desc-box">
                {/**内容 */}
                <div className="desc-text">
                    {content.text}
                </div>
                {/**图片 */}
                <div className="img-box">
                    {content.imgSrc.map((item, index) => (<img key={index} src={item} alt="" />))}
                </div>
            </div>
        </ZoomMessageStyle>
    )
}

export default React.memo(ZoomMessage)