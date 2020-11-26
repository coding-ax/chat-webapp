import { actionType } from './index'
// 连接
import { getSocket } from '../../../api/GetSocket'

const changeSocket = (data) => (
    {
        type: actionType.SOCKET,
        data
    }
)

// 导出action操作方法

// 根据token设置socket
export const socketConnect = (token) => {
    return dispatch => {
        const socket = getSocket(token)
        dispatch(changeSocket(socket))
    }
}