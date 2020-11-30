import React from 'react'
// 导入style
import { DialogStyle } from './style'
const Dialog = (props) => {
    const { open, title, needCheck } = props
    const { onCancel, onConfirm } = props
    return (
        <DialogStyle style={{ display: open ? 'flex' : 'none' }}>
            <div className="contain">
                <div className="title">{title}</div>
                <div className="content">
                    {props.children}
                </div>
                {/**盒子 */}
                <div className="button-box" style={{ display: needCheck ? 'flex' : 'none' }}>
                    <span className="button-left" onClick={() => {
                        onConfirm();
                    }}>确认</span>
                    <span className="button-right" onClick={() => {
                        onCancel();
                    }}>取消</span>
                </div>
            </div>
        </DialogStyle>
    )
}

export default React.memo(Dialog) 