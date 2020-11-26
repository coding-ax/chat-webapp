// 在此处编写业务逻辑并导出
import { produce } from 'immer'
// 导入动作
import { actionType } from './index'
// 初始值
const initialState = {
    //socket
    socket: null
}
// 编写reducer
const HomeReducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case actionType.SOCKET:
                draft.socket = action.data
                break;
            // case ACTION_TYPE_2:
            //     break
            default:
                break;
        }
    })


}
export { HomeReducer }