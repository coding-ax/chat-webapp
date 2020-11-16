import styled from 'styled-components'
const LoginStyle = styled.div`
/* 限定为fixed布局以应用react-transition-group */
    position:fixed;
    height:100vh;
    width:100vw;
/* 整体居中 */
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    /* 设置iconbox */
    .icon-box{
        display:flex;
        flex-direction:row;
        justify-content:center;
        align-items:center;
        font-size:1.5rem;
        // 来一点点偏移
        span{
            position:relative;
            left:0.5rem;
            font-weight:900;
            font-family:Arial, Helvetica, sans-serif
        }
    }
    .button-go{
        width:4rem;
        height:4rem;
        margin-top:1rem;
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:50%;
    }
`
export {
    LoginStyle
}