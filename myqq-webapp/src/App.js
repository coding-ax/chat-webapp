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
function App() {
  return (
    <Provider store={store} >
      <Router>
        <NormalizeStyle />
        {renderRoutes(routes)}
      </Router>
    </Provider>
  );
}

export default App;
