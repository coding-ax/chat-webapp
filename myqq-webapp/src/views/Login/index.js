import React, { useState } from 'react'
import { connect } from 'react-redux'
// 导入store相关

// 导入CSS
import { LoginStyle } from './style'
// 导入组件
import Icon from '../../components/context/Icon'
import LoginInput from '../../components/common/LoginInput'
function Login(props) {
    // 登录用户名和密码
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('')
    return (
        <LoginStyle>
            {/**标志 */}
            <div className="icon-box">
                <a href="/"><Icon xlinkHref='#icon-crew_react-copy'></Icon></a>
                <span>MyQQ</span>
            </div>
            {/**登录输入框 */}
            {
                isLogin && (<div className="input-box">
                    <LoginInput xlinkHref='#icon-morentouxiang' type="text" value={username} handleInput={(e) => {
                        setUsername(e)
                    }} placeHolder="请输入用户名" />
                    <LoginInput xlinkHref='#icon-mima' type="password" value={password} placeHolder="请输入密码" handleInput={(e) => {
                        setPassword(e)
                    }} />
                </div>)
            }
            {/**注册输入框 */}
            {
                !isLogin && (<div className="input-box">
                    <LoginInput xlinkHref='#icon-morentouxiang' type="text" value={username} handleInput={(e) => {
                        setUsername(e)
                    }} placeHolder="请输入用户名" />
                    <LoginInput xlinkHref='#icon-mima' type="password" value={password} placeHolder="请输入密码" handleInput={(e) => {
                        setPassword(e)
                    }} />
                    <LoginInput xlinkHref={confirmPassword === "" ? "#icon-crew_react" : confirmPassword === password ? '#icon-querenmima' : '#icon-cuowu'} type="password" value={confirmPassword} placeHolder="确认密码" handleInput={(e) => {
                        setConfirmPassword(e)
                    }} />
                </div>)
            }
            {/**控制按钮 */}
            <div className='button-go' onClick={() => {
                if (isLogin) {
                    // 登录 通过redux获取数据
                    if (username && password) {

                    } else {
                        alert('请完整输入账号和密码')
                    }
                } else {
                    // 注册
                    if (username && password && password === confirmPassword) {

                    } else {
                        alert('信息不足，请完成填写')
                    }
                }
            }} >
                <Icon xlinkHref='#icon-denglu' size="1.3rem" />
            </div>
            {/**注册按钮 */}
            <a style={{ marginTop: '1rem', fontSize: "0.8rem", textDecoration: 'underline', color: '#3F91CF' }} onClick={() => {
                setIsLogin(!isLogin)
            }} >{isLogin ? '点我注册' : '切换登录'}</a>
        </LoginStyle>
    )
}

// 配置redux映射关系
const mapStateToProps = (state) => {
    return {
        count: state.LoginReducer.value,
        list: state.LoginReducer.list
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch({ type: 'ADD' })
        },
        decrese: () => {
            dispatch({ type: 'DECRESE' })
        },
        addList: () => {
            dispatch({ type: 'ADD_LIST' })
        },
        decreseList: () => {
            dispatch({ type: 'DECRESE_LIST' })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login)) 