import React from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
const GlobalToast = styled.div`
/* csstransiton动画 */
.star {
    display: inline-block;
    margin-left: 0.5rem;
    transform: scale(1.25);
}

.star-enter {
    opacity: 0.01;
    transform: translateY(300%);
}

.star-enter-active {
    opacity: 1;
    transform: translateY(0%);
    transition: all 500ms ease-out;
}

.star-exit {
    opacity: 1;
    transform: translateY(0%);
}

.star-exit-active {
    opacity: 0;
    transform: translateY(-100%);
    transition: all 500ms ease-in;
}
position:fixed;
bottom:5rem;
`
const ToastStyle = styled.div`
    width:70vw;
    height:7vh;
    text-align:center;
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    text-align:center;
    color:#fff;
    border-radius:0.5rem;
    background-color:rgba(0,0,0,0.4);
` 
const Toast = (props) => {
    const { content, open } = props;

    return (
        <GlobalToast>
            <CSSTransition in={open}
                timeout={500}
                key='toast'
                classNames="star"
                unmountOnExit={true}
            >
                <ToastStyle >{content}</ToastStyle>
            </CSSTransition>
        </GlobalToast>
    )
}
export default React.memo(Toast)