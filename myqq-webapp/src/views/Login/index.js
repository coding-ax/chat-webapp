import React from 'react'
import { connect } from 'react-redux'
// 导入store
import { mapDispatchToProps, mapStateToProps } from './store'
function Login(props) {
    const { count, add, decrese } = props;
    return (<div>
        <button onClick={() => {
            add()
        }}  >add</button>
        {count}
        <button onClick={() => {
            decrese()
        }}>delete</button>
    </div>)
}


export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Login)) 