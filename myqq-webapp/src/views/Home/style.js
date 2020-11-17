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
    }
`
export { NavBar }