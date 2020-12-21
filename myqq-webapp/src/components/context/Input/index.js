import React, { useState, useImperativeHandle, useRef } from 'react'
// 组件
import { Picker } from 'emoji-mart'
import Icon from '../Icon'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css'

const InputStyle = styled.div`
    position:absolute;
    min-height:3rem;
    /* max-height:5rem; */
    display:flex;
    flex-direction:column;
    align-items:center;
    overflow:scroll;
    left:0;
    right:0;
    bottom:0;
    /* z-index:1; */
    color:#000;
    background-color:#f6f6f6;
    .input-contain{
        width:100%;
        display:flex;
        flex-direction:row;
        align-items:center;
        #input-box{
            font-size:1.5rem;
            min-height:2rem;
            max-height:8rem;
            margin:2%;
            padding: 0 3%;
            width:80%;
            overflow:scroll;
            outline: none; 
            border-radius:1rem;
            background-color:#fff;
        }   
        .icon-box{
            width:30%;
            display:flex;
            justify-content:center;
            align-items:center;
            .send-btn{
                background-color:#FBC531;
                height:2rem;
                line-height:2rem;
                width:100%;
                text-align:center;
                border-radius:0.5rem;
            }
            span{
                margin:3%;
            }
        }
    }
   
`
// 组件 准备抛出这个关闭的setValue方法 返回value就好
export const Input = React.forwardRef((props, ref) => {
    const [showEmoji, setShowEmoji] = useState(false);
    // 用于记录输入 用于回传
    const [value, setValue] = useState('');
    let files = []
    // 获取发送事件
    const { handleValue = () => { }, handleImage = () => { } } = props;
    // 获取提交并处理
    // 暴露一部分操作接口
    useImperativeHandle(ref, () => ({
        hiddenInput: () => {
            setShowEmoji(false)
        },
        getValue: () => {
            return value;
        },
        getImage: () => {
            return files
        }
    }))
    const inputFile = useRef(null)
    const divInput = useRef(null)
    return (
        <InputStyle>
            <div className="input-contain">
                {/**输入框 */}
                <div contentEditable="true"
                    ref={divInput}
                    id="input-box"
                    suppressContentEditableWarning={true}
                    tabIndex="0"
                    onInput={event => {
                        setValue(event.currentTarget.innerText)
                    }}
                    onFocus={() => {
                        if (showEmoji) {
                            // 点击隐藏表情输入
                            setShowEmoji(false)
                        }
                    }}
                >

                </div>
                {/**按钮 */}
                <div className="icon-box">
                    <span onClick={() => {
                        setShowEmoji(!showEmoji)
                    }}>
                        <Icon size={"2rem"} xlinkHref={"#icon-biaoqing"} />
                    </span>
                    {
                        value === '' ? (<span onClick={() => {
                            inputFile.current.click();
                        }}>
                            <Icon size={"2rem"} xlinkHref={"#icon-tupian"} />
                        </span>) : (<span className="send-btn"
                            onMouseDown={event => {
                                // 阻止失去焦点
                                event.preventDefault();
                            }}
                            onClick={() => {
                                // 传递value
                                handleValue(value);
                                // 清空输入,重置value
                                divInput.current.innerText = ''
                                setValue('');
                            }}>发送</span>)
                    }
                </div>
            </div>
            <Picker
                style={
                    {
                        width: "100%",
                        display: showEmoji ? 'block' : 'none '
                    }
                }
                set='apple'
                showPreview={false}
                showSkinTones={false}
                title={"表情包"}
                theme={"auto"}
                onSelect={(emoji) => {
                    //  直接加入native设置value
                    divInput.current.innerText += emoji.native;
                    setValue(divInput.current.innerText)
                }}
            />
            {/**输入框 用来选择图片 */}
            <input type="file" ref={inputFile} style={{ display: 'none' }}
                accept="image/*"
                onChange={(event) => {
                    // 赋值给files
                    files = event.target.files;
                    handleImage(files)
                }}
            />
        </InputStyle>
    )
})

export default React.memo(Input)