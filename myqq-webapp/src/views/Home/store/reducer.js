// 在此处编写业务逻辑并导出
import { produce } from 'immer'
// 导入动作
import { actionType } from './index'
// 初始值
const initialState = {
    //socket
    socket: null,
    // user信息
    userInfo: {
        avator: "https://xgpax.top/wp-content/uploads/2020/11/defaultAvator.png",
        birthday: null,
        gender: null,
        nickName: null,
        signature: null,
        userID: null
    }
}
// 编写reducer
const HomeReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case actionType.SOCKET:
                draft.socket = action.data
                break;
            case actionType.USERINFO:
                draft.userInfo = action.data
                break;
            default:
                break;
        }
    })
}
export { HomeReducer }