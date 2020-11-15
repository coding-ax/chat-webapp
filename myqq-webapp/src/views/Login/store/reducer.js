// 在此处编写业务逻辑并导出给最外层app的store
const count = (state = 0, action) => {
    switch (action.type) {
        case 'ADD':
            return state + 1
        case 'DECRESE':
            return state - 1
        default:
            return state
    }
}
export { count }