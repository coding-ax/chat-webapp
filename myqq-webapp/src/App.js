import React from 'react'
// 路由配置
import { HashRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
// redux配置
import { Provider } from 'react-redux'
import store from './store'
// 全局css导入 normalize.css
import NormalizeStyle from './globalStyle/normalize'
// 导入全局路由动画组件
import AnimationGo from './components/common/AnimationGo'
function App() {
  return (

    <Provider store={store} >
      <NormalizeStyle />
      <Router>
        <AnimationGo>
          {renderRoutes(routes, {}, { key: 'test' })}
        </AnimationGo>
      </Router>
    </Provider>
  );
}

export default App;
