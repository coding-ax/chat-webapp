import React from 'react'
import styled from 'styled-components';
const NavStyle = styled.div`
    display:flex;
    flex-direction:row;
    width:100vw;
    height:7vh;
    background:#fbc531;
    align-items:center;
    font-size:1.2rem;
    font-family: STSong STHeiti STHeiti Light [STXihei];
    &>*{
        flex:1;
    }
    /* 规定第2个为title */
    &>*:nth-child(1){
        text-align:left;
    }
    &>*:nth-child(2){
        text-align:center;
    }
    &>*:nth-child(3){
        text-align:right;
    }
`
const Nav = (props) => {
    return (
        <NavStyle>
            {props.children}
        </NavStyle>
    )
}
export default React.memo(Nav);