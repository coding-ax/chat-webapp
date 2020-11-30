import styled from 'styled-components'
const UserContain = styled.div`
display:flex;
flex-direction:row;
justify-content:center;
align-items:center;
`;
const MessageContain = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
text-align:left;
.title{
    font-size:1.3rem;
    font-weight:700;
}
.number{
    font-size:0.9rem;
    margin-top:0.2rem;
    span{
        color:#888888;
        font-size:0.5rem;
    }
}
`
export {
    MessageContain,
    UserContain
}