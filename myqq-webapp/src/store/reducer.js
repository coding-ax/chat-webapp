import { combineReducers } from 'redux'
// 导入并组合所有的reducer 然后导出
import { LoginReducer } from '../views/Login/store'
export default combineReducers({
    LoginReducer,
})