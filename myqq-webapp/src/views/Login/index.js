import React, { useState } from 'react'
import { connect } from 'react-redux'
// 导入store相关
import { mapDispatchToProps, mapStateToProps } from './store'
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
                <Icon xlinkHref='#icon-crew_react-copy'></Icon>
                <span>MyQQ</span>
            </div>
            {/**登录输入框 */}
            {
                !isLogin && (<div className="input-box">
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
                isLogin && (<div className="input-box">
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
            {/**登录按钮 */}
            <div className='button-go' style={{ backgroundImage: 'linear-gradient(#529FE2,#2980b9)' }} onClick={()=>{
               console.log(props)
               props.history.push('/home')
            }} >
                <Icon xlinkHref='#icon-denglu' size="1.3rem" />
            </div>
            {/**注册按钮 */}
        </LoginStyle>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login)) 