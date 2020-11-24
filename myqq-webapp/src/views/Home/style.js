import styled from 'styled-components'
const NavBar = styled.div`
    position:fixed;
    display:flex;
    bottom:0;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    text-align:center;
    height:4rem;
    background-color:rgba(245,245,245,0.8);
    width:100%;
    &>*{
        flex:1;
        text-decoration:none;
        &:hover{
            animation:scale 0.2s linear;
        }
    }
    @keyframes scale{
        0% {
            transform:scale(1);
        }
        50%{
            transform:scale(0.5);
        }
        100%{
            transform:scale(1);
        }
    }
`
export { NavBar }