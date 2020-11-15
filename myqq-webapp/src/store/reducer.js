import { combineReducers } from 'redux'
// 导入并组合所有的reducer 然后导出
import { count } from '../views/Login/store/reducer'
export default combineReducers({
    count,
})