import React from 'react'
const EditDetail = (props) => {
    const { title } = props;
    return (
        <div>
            <span>{title}</span>
            <span>{props.children}</span>
        </div>)
}
export default React.memo(EditDetail)