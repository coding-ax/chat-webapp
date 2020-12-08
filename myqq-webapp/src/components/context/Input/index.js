import React, { useState, useImperativeHandle } from 'react'
// 组件
import { Picker, Emoji } from 'emoji-mart'
import Icon from '../Icon'
import styled from 'styled-components'
import 'emoji-mart/css/emoji-mart.css'
// 动画
import { CSSTransition } from 'react-transition-group'
import './transition.css'
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
            span{
                margin:3%;
            }
        }
    }
   
`
// 组件 准备抛出这个关闭的setValue方法
export const Input = React.forwardRef((props, ref) => {
    const [showEmoji, setShowEmoji] = useState(false);
    // const [value, setValue] = useState('')
    useImperativeHandle(ref, () => ({
        hiddenInput: () => {
            setShowEmoji(false)
        }
    }))
    return (
        <InputStyle>
            <div className="input-contain">
                {/**输入框 */}
                <div contentEditable="true"
                    id="input-box"
                    suppressContentEditableWarning={true}
                    tabIndex="0"
                    onInput={event => {
                        console.log(event.currentTarget.innerText)
                    }}
                    onFocus={() => {
                        if (showEmoji) {
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
                    <span >
                        <Icon size={"2rem"} xlinkHref={"#icon-tupian"} />
                    </span>
                </div>
            </div>



            <CSSTransition
                in={showEmoji}
                timeout={300}
                classNames='bottom2top'
            // unmountOnExit
            >
                <Picker
                    style={{ width: "100%" }}
                    set='apple'
                    showPreview={false}
                    showSkinTones={false}
                    title={"表情包"}
                    theme={"auto"}
                />
            </CSSTransition>
        </InputStyle>
    )
})

export default React.memo(Input)