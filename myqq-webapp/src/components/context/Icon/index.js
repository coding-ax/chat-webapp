import React from 'react'
const Icon = React.memo((props) => {
    // xlinkHref指定icon类型 
    // size指定大小  默认2.5rem
    const { xlinkHref, size } = props
    return (
        <svg className="icon" aria-hidden="true" style={{ width:size || '2.5rem', height:size || '2.5rem'}}>
            <use xlinkHref={xlinkHref}></use>
        </svg>)})
export default React.memo(Icon) 