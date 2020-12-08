import React from 'react'
// 导入style
import { DialogStyle } from './style'
const Dialog = (props) => {
    const { open, title, needCheck = false, buttonDesc = ['确认', '取消'] } = props
    const { onCancel, onConfirm, onExit } = props
    return (
        <DialogStyle onClick={() => {
            if (onExit) onExit();
        }} style={{ display: open ? 'flex' : 'none' }}>
            <div className="contain">
                <div className="title">{title}</div>
                <div className="content">
                    {props.children}
                </div>
                {/**盒子 */}
                <div className="button-box" style={{ display: needCheck ? 'flex' : 'none' }}>
                    <span className="button-left" onClick={(event) => {
                        // 阻止冒泡
                        event.stopPropagation();
                        if (onConfirm) onConfirm();
                    }}>{buttonDesc[0]}</span>
                    <span className="button-right" onClick={(event) => {
                        // 阻止冒泡
                        event.stopPropagation();
                        if (onCancel) onCancel();
                    }}>{buttonDesc[1]}</span>
                </div>
            </div>
        </DialogStyle>
    )
}

export default React.memo(Dialog) 