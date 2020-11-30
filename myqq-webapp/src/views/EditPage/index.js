import React from 'react'
// 导入组件
import Nav from '../../components/common/Nav'
import Icon from '../../components/context/Icon'
const EditPage = props => {
    const { history } = props;
    return (
        <div>
            <Nav>
                <span onClick={() => {
                    history.goBack();
                }}> <Icon size={'1.5rem'} xlinkHref="#icon-houtui"></Icon></span>
                <span>编辑</span>
                <span></span>
            </Nav>
        </div>
    )
}
export default React.memo(EditPage)