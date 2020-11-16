// 在此处编写业务逻辑并导出给最外层app的store
// 使用immer来保证immutable效果
import { produce } from 'immer'
// 初始值
const initialState = {
   
}
// reducer写法： state=initialState指定初始值
const LoginReducer = function (state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD':
                
                break;
            case 'DECRESE':
                
                break;
            case 'ADD_LIST':
                
                break;
            case 'DECRESE_LIST':
               
                break;
            default:
                break;
        }
    })
}
export { LoginReducer }