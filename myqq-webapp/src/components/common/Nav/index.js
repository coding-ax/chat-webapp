import React from 'react'
import styled from 'styled-components';
const NavStyle = styled.div`
    display:flex;
    flex-direction:row;
    
`
const Nav = (props) => {
    return (
        <NavStyle>
            {props.children}
        </NavStyle>
    )
}
export default React.memo(Nav);