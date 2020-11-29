// 在此处编写业务逻辑并导出给最外层app的store
// 使用immer来保证immutable效果
import { produce } from 'immer'
// 导入动作方式
import { actionType } from './index'
// 初始值
const initialState = {
    // jwt
    token: '',
    // 是否正在加载
    loading: false,
    // 是否登录成功
    isLogin: false,
    // 是否出现业务逻辑上的失败
    isError: false,
    // 是否注册成功
    isRegister: false
}
// reducer写法： state=initialState指定初始值
const LoginReducer = function (state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case actionType.TOKEN:
                draft.token = action.data
                break;
            case actionType.LOADING:
                draft.loading = action.data
                break;
            case actionType.ISLOGIN:
                draft.isLogin = action.data
                break;
            case actionType.ERROR:
                draft.isError = action.data
                break;
            case actionType.REGISTER:
                draft.isRegister = action.data
                break;
            default:
                break;
        }
    })
}
export { LoginReducer }