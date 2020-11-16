import React from 'react'
// 导入style
import { DialogStyle } from './style'
const Dialog = (props) => {
    const { open, content } = props
    return (
        <DialogStyle open={open||true}>
            {content||""}
        </DialogStyle>
    )
}
// Dialog.defaultProps = {
//     open: false,
//     content: "test"
// }
export default Dialog