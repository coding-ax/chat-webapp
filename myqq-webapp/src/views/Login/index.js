import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
// 导入store相关
import { actionCreator } from './store'
// 导入CSS
import { LoginStyle } from './style'
// 导入组件
import Icon from '../../components/context/Icon'
import LoginInput from '../../components/common/LoginInput'
import Dialog from '../../components/common/Dialog'
import Loading from '../../components/common/loading'
import Toast from '../../components/common/Toast'
import { getInfo } from '../../api/LoginRequest'
function Login(props) {
    // 登录用户名和密码
    const { loading, error, history, register, token } = props
    const { getLogin, changeToken, changeLoading, changeIsError, registerUser, changeRegister } = props;
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [isLoginStatus, setIsLoginStatus] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState(false);
    const [content, setContent] = useState('');
    // 设置错误提示事件
    // 通过useCallback改写
    const changeToast = useCallback((content) => {
        setContent(content)
        setToast(true)
        // 两秒后消失
        setTimeout(() => {
            setToast(false)
        }, 2000);
    }, [setToast, setContent])

    // 从本地获取token
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken) {
            changeToken(localToken);
        }
    }, [changeToken])

    // 登录成功的逻辑处理
    useEffect(() => {
        if (token) {
            // 存进本地
            getInfo('', token).then(() => {
                localStorage.setItem('token', token)
                history.push('/home/message')
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [token, history])
    
    // 中途出错的逻辑处理
    useEffect(() => {
        if (error) {
            changeToast(isLoginStatus ? '密码或用户名错误' : '用户名已存在')
            // 重置
            changeIsError(false)
        }
    }, [error, changeIsError, isLoginStatus,changeToast])

    // 注册成功
    useEffect(() => {
        if (register) {
            changeToast('恭喜你！ 注册成功！')
            changeRegister(false);
            setTimeout(() => {
                setIsLoginStatus(true);
            }, 500);
        }
    }, [register, changeRegister,changeToast])


    return (
        <LoginStyle>
            {/**标志 */}
            <div className="icon-box">
                <a href="/"><Icon xlinkHref='#icon-crew_react-copy'></Icon></a>
                <span>MyQQ</span>
            </div>

            {/**登录输入框 */}
            {
                isLoginStatus && (<div className="input-box">
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
                !isLoginStatus && (<div className="input-box">
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
            <div className='button-go' style={{ animation: loading ? "circle 1s linear infinite" : "" }} onClick={() => {
                if (isLoginStatus) {
                    // 登录 通过redux获取数据
                    if (username && password) {
                        getLogin(username, password)
                        changeLoading(true)
                    } else {
                        changeToast('信息不足，请完成填写')
                    }
                } else {
                    // 注册
                    if (username && password && password === confirmPassword) {
                        registerUser(username, password)
                        changeLoading(true);
                    } else {
                        changeToast('请完成填写')
                    }
                }
            }} >
                <Icon xlinkHref='#icon-denglu' size="1.3rem" />
            </div>

            {/**切换按钮 */}
            <span style={{ marginTop: '1rem', fontSize: "0.8rem", textDecoration: 'underline', color: '#3F91CF' }} onClick={() => {
                setIsLoginStatus(!isLoginStatus)
            }}
            >{isLoginStatus ? '点我注册' : '切换登录'}</span>

            {/**加载提示组件 */}
            <Dialog open={props.loading} title='加载中...'  >
                <Loading />
            </Dialog>

            {/** 轻提示组件*/}
            <Toast open={toast} content={content}></Toast>
        </LoginStyle>

    )
}

// 配置redux映射关系
const mapStateToProps = (state) => {
    return {
        token: state.LoginReducer.token,
        userInfo: state.LoginReducer.userInfo,
        loading: state.LoginReducer.loading,
        isLogin: state.LoginReducer.isLogin,
        error: state.LoginReducer.isError,
        register: state.LoginReducer.isRegister
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getLogin: (username, password) => {
            dispatch(actionCreator.getLogin(username, password))
        },
        getInfo: (username) => {
            dispatch(actionCreator.getUserInfo(username))
        },
        changeToken: (token) => {
            dispatch(actionCreator.tokenChange(token))
        },
        changeLoading: (status) => {
            dispatch(actionCreator.changeLoadingStatus(status))
        },
        changeIsLogin: (status) => {
            dispatch(actionCreator.changeIsLoginStatus(status))
        },
        changeIsError: (status) => {
            dispatch(actionCreator.changeErrorStatus(status))
        },
        registerUser: (username, password) => {
            dispatch(actionCreator.getRegister(username, password))
        },
        changeRegister: (status) => {
            dispatch(actionCreator.changeRegisterStatus(status))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login)) 