import React from 'react'
const Avator = (props) => {
    const { imgSrc, size } = props;
    return (
        <div style={{ width: (size || '4') + 'rem', height: (size || '4') + 'rem' }}>
            <img style={{ width: "100%", height: "100%", borderRadius: '50%' }} src={imgSrc} alt="" />
        </div>
    )
}
export default React.memo(Avator)