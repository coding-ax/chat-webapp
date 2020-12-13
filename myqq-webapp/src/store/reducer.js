import { combineReducers } from 'redux'
// 导入并组合所有的reducer 然后导出
import { LoginReducer } from '../views/Login/store'
import { HomeReducer } from '../views/Home/store'
import { ChatReducer } from '../views/Chat/store'
// 加载组件的全局
export default combineReducers({
    LoginReducer,
    HomeReducer,
    ChatReducer
})