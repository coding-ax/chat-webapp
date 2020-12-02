import React, { useState, useEffect } from 'react'
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import LoginInput from '../../components/common/LoginInput'
import Friend from '../../components/context/Friend'
import Toast from '../../components/common/Toast'
// css
import styled from 'styled-components'
//导入方法
import { connect } from 'react-redux'
import { getSearchFriend, getAddFriend } from '../../store/socketHandle/action'

const AddStyle = styled.div`
    .desc-word{
        text-align:center;
        font-size:0.7rem;
        color:#888;
        margin-top:1rem;
    }
`
export const AddFriends = (props) => {
    const { socket, searchFriendList } = props;
    const { onExit } = props
    const [username, setUsername] = useState('')
    const [show, setShow] = useState(false);
    const [content, setContent] = useState('');
    useEffect(() => {
        if (username && !searchFriendList.length) {
            showToast('除了你自己，查无此人~')
        }
        // 此处用到了username但是仅作为判断标志 不需要作为hook依赖
        // eslint-disable-next-line
    }, [searchFriendList])
    const showToast = (content) => {
        setShow(true);
        setContent(content);
        setTimeout(() => {
            setShow(false)
        }, 1000);
    }
    return (
        <div>
            <Nav>
                <span onClick={() => {
                    onExit();
                }}>
                    <Icon xlinkHref={"#icon-houtui"} size={"1.7rem"}></Icon>
                </span>
                <span>添加好友</span>
                <span></span>
            </Nav>
            <AddStyle>
                {/**搜索框 */}
                <LoginInput xlinkHref={'#icon-sousuo'}
                    placeHolder={"用户名/userID/昵称"}
                    value={username}
                    handleInput={(value) => {
                        setUsername(value)
                    }}
                    handleIconClick={() => {
                        if (username) {
                            getSearchFriend(socket, username)
                        } else {
                            showToast("输入不能为空噢！")
                        }

                    }}
                ></LoginInput>
                {/**显示框 */}
                <div >
                    {
                        !searchFriendList.length&&(<div className='desc-word'>暂无结果,换个词搜搜看吧！</div>)
                    }
                    {
                        searchFriendList.map(item => (
                            <Friend key={item.userID}
                                avator={item.avator}
                                desc={item.signature}
                                nickName={item.nickName}
                                handleIconClick={() => {
                                    getAddFriend(socket, item.userID)
                                    showToast("请求已发送")
                                }}
                            ></Friend>
                        ))
                    }
                </div>

                {/**提示框 */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Toast open={show} content={content}></Toast>
                </div>

            </AddStyle>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket,
        searchFriendList: state.HomeReducer.searchFriendList
    }
}

export default connect(mapStateToProps)(React.memo(AddFriends)) 