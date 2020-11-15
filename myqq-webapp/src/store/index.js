import { createStore } from 'redux'
// 导入组合后的reducer
import reducer from './reducer'
//创建store并导出
export default createStore(reducer)