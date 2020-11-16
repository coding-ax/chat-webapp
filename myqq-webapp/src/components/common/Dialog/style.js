import styled from 'styled-components'
const DialogStyle = styled.div`
    position:fixed;
    z-index:1;
    left:0;
    right:0;
    top:0;
    bottom:0;
    background-color:rgba(0,0,0,0.4);
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    color:#000;
    .contain{
        background-color:#fff;
        width:50%;
        border-radius:0.5rem;
        height:25vh;
        display:flex;
        flex-direction:column;
        text-align:center;
        .title{
            display:flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            height:20%;
            border-bottom:1px solid #f5f5f5;
        }
        .content{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            height:60%;
        }
        .button-box{
            height:20%;
            display:flex;
            flex-direction:row;
            justify-content:center;
            align-items:center;
            &>*{
                flex:1;
                display:flex;
                flex-direction:row;
                justify-content:center;
                align-items:center;
                height:100%;
                border-top:1px solid #f5f5f5;
            }
            .button-left{
                color:#206386;
                border-right:1px solid #f5f5f5;
            }
        }
    }
`
export { DialogStyle }