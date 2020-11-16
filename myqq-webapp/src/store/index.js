import { createStore, applyMiddleware, compose } from 'redux'
// 导入redux-thunk并使用
import thunk from 'redux-thunk'
// 导入组合后的reducer
import reducer from './reducer'
// 扩展开启
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//创建store并导出
export default createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)
))