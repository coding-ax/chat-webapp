// 在此处编写业务逻辑并导出给最外层app的store
// 使用immer来保证immutable效果
import { produce } from 'immer'
// 导入动作方式
import { actionType } from './index'
// 初始值
const initialState = {
    token: '',
    userInfo: {
        id: null,
        userID: null,
        username: null,
        password: null
    },
    loading: false,
    isLogin: false
}
// reducer写法： state=initialState指定初始值
const LoginReducer = function (state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case actionType.TOKEN:
                draft.token = action.data
                break;
            case actionType.USERINFO:
                draft.userInfo = action.data
                break;
            case actionType.LOADING:
                draft.loading = action.data
                break;
            case actionType.ISLOGIN:
                draft.isLogin = action.data
            default:
                break;
        }
    })
}
export { LoginReducer }