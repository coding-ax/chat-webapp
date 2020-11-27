import React from 'react'
const Avator = (props) => {
    const { imgSrc, size } = props;
    return (
        <div style={{ width: (size || '4') + 'rem', height: (size || '4') + 'rem' }}>
            <img style={{ width: "100%", height: "100%" }} src={imgSrc || "https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png"} alt="https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png" />
        </div>
    )
}
export default React.memo(Avator)