import React, { useEffect } from 'react'
// 路由配置
import { BrowserRouter as Router } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './routes'
// redux配置
import { Provider } from 'react-redux'
import store from './store'
// 全局css导入 normalize.css
import NormalizeStyle from './globalStyle/normalize'
import SelfStyle from './globalStyle/selfStyle'
// 导入全局路由动画组件
import AnimationGo from './components/common/AnimationGo'

const resize = () => {
  // window.location.reload()
};

function App() {
  useEffect(() => {
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
    }
  }, [])
  return (
    <Provider store={store} >
      <SelfStyle />
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
