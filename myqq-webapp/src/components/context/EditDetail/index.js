import React from 'react'
import styled from 'styled-components'
const EditStyle = styled.div`
    display:flex;
    align-items:center;
    padding:1rem 0 ; 
    font-size:1rem;
    background-color:#fff;
    .title{
        width:20%;
        text-align:center;
    }
    .children{
        width:80%;
        input[type="text"]{
            width:90%;
        }
        input[type="date"]{
            width:90%;
        }
        input{
            border:none;
            font-size:0.9rem;
            padding:0.2rem 0;
        }
    }
`
const EditDetail = (props) => {
    const { title } = props;
    return (
        <EditStyle>
            <span className='title'>{title}</span>
            <span className='children'>{props.children}</span>
        </EditStyle>
    )
}
export default React.memo(EditDetail)