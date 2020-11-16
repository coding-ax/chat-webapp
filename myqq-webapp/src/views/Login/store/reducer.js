// 在此处编写业务逻辑并导出给最外层app的store
// 使用immer来保证immutable效果
import { produce } from 'immer'
// 初始值
const initialState = {
    value: 0,
    list: [
        {
            id: 1,
            text: "good morning"
        },
        {
            id: 2,
            text: "good morning"
        },
        {
            id: 3,
            text: "good morning"
        },
        {
            id: 4,
            text: "good morning"
        }
    ]
}
// reducer写法： state=initialState指定初始值
const count = function (state = initialState, action) {
    return produce(state, (draft) => {
        switch (action.type) {
            case 'ADD':
                draft.value++;
                break;
            case 'DECRESE':
                draft.value--;
                break;
            case 'ADD_LIST':
                draft.list.push({
                    id: draft.list.length+1,
                    text: "good morning"
                })
                break;
            case 'DECRESE_LIST':
                draft.list.pop();
                break;
            default:
                break;
        }
    })
}
export { count }