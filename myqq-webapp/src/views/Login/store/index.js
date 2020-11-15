const mapStateToProps = (state) => {
    return {
        count: state.count
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        add: () => {
            dispatch({ type: 'ADD' })
        },
        decrese: () => {
            dispatch({ type: 'DECRESE' })
        }
    }
}
export {
    mapDispatchToProps,
    mapStateToProps
}