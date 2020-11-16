// 在这里编写映射关系
const mapStateToProps = (state) => {
    return {
        count: state.count.value,
        list:state.count.list
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
        addList:()=>{
            dispatch({type:'ADD_LIST'})
        },
        decreseList:()=>{
            dispatch({type:'DECRESE_LIST'})
        }
    }
}
export {
    mapDispatchToProps,
    mapStateToProps
}