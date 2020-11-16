import { createStore, applyMiddleware } from 'redux'
// 导入redux-thunk并使用
import thunk from 'redux-thunk'
// 导入组合后的reducer
import reducer from './reducer'
//创建store并导出
export default createStore(reducer, applyMiddleware(thunk))