import React, { useRef, useState } from 'react'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
// 导入文件上传
import { file2qiniuCloud, pubZoom } from '../../api/HomeRequest'
const PubZoomStyle = styled.div`
    height:100vh;
    display:flex;
    flex-direction:column;
    align-items:center;
    background-color:#f5f5f5;
    .input-box{
        margin-top:1rem;
        background-color:#fff;
        textarea{
            border-radius:0.4rem;
        }
        .img-input{
            display:flex;
            flex-direction:row;
            flex-wrap:wrap;
            align-items:center;
            &>*{
                background-color:#f5f5f5;
                width:6rem;
                height:6rem;
                display:flex;
                flex-direction:column;
                align-items:center;
                justify-content:center;
               margin:0.2rem;
            }
            img{
                width:6rem;
                height:6rem;
            }
            .img-select{
                
            }
        }
    }
    .text-box{
        margin-top:1rem;
        width:90vw;
        border:none;
        resize:none;
        outline:none;
        
    }
`
export const PubZoom = (props) => {
    const { onExit = () => { } } = props;
    const token = useSelector(state => state.LoginReducer.token)
    const userID = useSelector(state => state.HomeReducer.userInfo.userID)
    // state
    //输入
    const [value, setValue] = useState('')
    const [imgSrc, setImgSrc] = useState([])
    const Input = useRef(null);
    return (
        <PubZoomStyle>
            <Nav>
                <span style={{ position: "relative", left: '0.5rem' }} onClick={() => {
                    onExit();
                }}>
                    <Icon size={'1.5rem'} xlinkHref="#icon-houtui"></Icon>
                </span>
                <span>发布</span>
                <span style={{ position: "relative", right: '0.5rem' }} onClick={() => {
                    console.log("?")
                    pubZoom(token, {
                        userID,
                        contentImgSrc: imgSrc.toString(),
                        contentText: value
                    })
                    onExit();
                    setValue('')
                    setImgSrc([])

                }}>
                    <Icon size={'1.5rem'} xlinkHref="#icon-wanchengchenggong"></Icon>
                </span>
            </Nav>
            {/**输入框与图片 */}
            <div className="input-box">
                <div className="input-area">
                    <textarea cols="30" rows="10" className="text-box" value={value} onChange={event => {
                        setValue(event.currentTarget.value)
                    }} placeholder="说点什么吧……"></textarea>
                </div>
                <div className="img-input">
                    {imgSrc.map((item, index) => (<div className="img-select" key={index}>
                        <img src={item} alt="" />
                    </div>))}

                    <div className="img-button" onClick={() => {
                        Input.current.click();
                    }}>
                        <Icon xlinkHref={'#icon-ziyuan'} />
                        <div>选择图片</div>
                    </div>
                    <input type="file" ref={Input} accept="image/*" style={{ display: 'none' }} onChange={async event => {
                        const files = event.currentTarget.files;
                        // 可能会有阻塞问题，先不考虑优化
                        for (let item of files) {
                            const url = await file2qiniuCloud(token, item);
                            // 插入
                            setImgSrc([...imgSrc, url])
                        }
                    }} />
                </div>
            </div>

        </PubZoomStyle>
    )
}

export default React.memo(PubZoom)