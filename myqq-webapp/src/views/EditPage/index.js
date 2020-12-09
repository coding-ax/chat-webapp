import React, { useState } from 'react'
// 导入redux
import { connect } from 'react-redux'
// 导入组件
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
import Avator from '../../components/common/Avator'
import EditDetail from '../../components/context/EditDetail'
import Dialog from '../../components/common/Dialog'
import Loading from '../../components/common/loading'
// 导入dayjs
import dayjs from 'dayjs'
// 导入数据处理的部分
import { file2qiniuCloud } from '../../api/HomeRequest'
// 导入socket操作方法
import { editUserDetail } from '../../store/socketHandle/action'
const EditPage = props => {
    const { onExit } = props;
    const { socket } = props;
    // 用state级别的userInfo进行数据绑定和操作
    const [confirm, setConfirm] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [userInfo, setUserInfo] = useState(props.userInfo)
    return (

        <div style={{ width: "100vw", height: "100vh", backgroundColor: "#f5f5f5" }}>
            <Nav>
                <span style={{ position: "relative", left: '0.5rem' }} onClick={() => {
                    onExit();
                }}>
                    <Icon size={'1.5rem'} xlinkHref="#icon-houtui"></Icon>
                </span>
                <span>编辑</span>
                <span style={{ position: "relative", right: '0.5rem' }} onClick={() => {
                    // 编辑完成
                    setConfirm(true)
                }}>
                    <Icon size={'1.5rem'} xlinkHref="#icon-wanchengchenggong"></Icon>
                </span>
            </Nav>
            {/**编辑框 */}
            <EditDetail title="头像">
                <input type="file" 
                    style={
                        {
                            opacity: 0,
                            position: "absolute",
                            top: "4rem",
                            height: "4rem",
                            width: "3rem"
                        }
                    }
                    accept="image/*"
                    onChange={async (event) => {
                        const file = event.target.files[0]
                        // 本地构造测试
                        // const src = window.URL.createObjectURL(event.target.files[0])
                        // 文件上传
                        const url = await file2qiniuCloud(props.token, file)
                        setUserInfo({
                            ...userInfo,
                            avator: url
                        })
                    }}
                />
                <Avator size={4} imgSrc={userInfo.avator}></Avator>
            </EditDetail>
            <EditDetail title="个签">
                <input type="text" maxLength={20} placeholder={"最大长度为20噢"} value={userInfo.signature} onChange={(event) => {
                    setUserInfo({
                        ...userInfo,
                        signature: event.target.value
                    })
                }} />
            </EditDetail>
            <br />
            <EditDetail title="昵称">
                <input type="text" maxLength={10} placeholder={"最大长度为10噢"} value={userInfo.nickName} onChange={(event) => {
                    setUserInfo({
                        ...userInfo,
                        nickName: event.target.value
                    })
                }} />
            </EditDetail>
            <EditDetail title="性别">
                <div>
                    <input type="radio" name="sex" value="1" checked={String(userInfo.gender) === "1"} onChange={(event) => {
                        setUserInfo({
                            ...userInfo,
                            gender: event.target.value
                        })
                    }} /><Icon size={'1.7rem'} xlinkHref={'#icon-xingbie'}></Icon> <br />
                    <input type="radio" name="sex" value="0" checked={String(userInfo.gender) === "0"} onChange={(event) => {
                        setUserInfo({
                            ...userInfo,
                            gender: event.target.value
                        })
                    }} /><Icon size={'1.7rem'} xlinkHref={'#icon-nv'}></Icon>
                </div>
            </EditDetail>
            <EditDetail title="生日">
                <input type="date" value={dayjs(userInfo.birthday).format('YYYY-MM-DD')} onChange={(event) => {
                    setUserInfo({
                        ...userInfo,
                        birthday: event.target.value
                    })
                }} />
            </EditDetail>

            {/**提示框 */}
            <Dialog needCheck={!isLoading} open={confirm} title={isLoading ? "加载中" : "警告"}
                onConfirm={() => {
                    editUserDetail(socket, userInfo)
                    setIsLoading(true)
                    setTimeout(() => {
                        setConfirm(false)
                        setIsLoading(false)
                        onExit();
                    }, 2000);
                }}
                onCancel={() => {
                    setConfirm(false)
                }}
            >
                {isLoading ? <Loading /> : (<span>你确定要修改吗？</span>)}
            </Dialog>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        socket: state.HomeReducer.socket,
        userInfo: state.HomeReducer.userInfo,
        token: state.LoginReducer.token
    }
}
export default connect(mapStateToProps)(React.memo(EditPage))