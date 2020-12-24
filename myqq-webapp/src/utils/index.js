import dayjs from 'dayjs'
let calendar = require('dayjs/plugin/calendar')
require('dayjs/locale/zh-cn')
dayjs.extend(calendar)
dayjs.locale('zh-cn')
export const formatDate = date => {
    return dayjs(date).calendar(null, {
        sameDay: '今天Ah:mm', // The same day ( Today at 2:30 AM )
        nextDay: '明天Ah:mm', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: '下周Ah:mm', // The next week ( Sunday at 2:30 AM )
        lastDay: '昨天Ah:mm', // The day before ( Yesterday at 2:30 AM )
        lastWeek: '上周dAh:mm', // Last week ( Last Monday at 2:30 AM )
        sameElse: 'MM/DD Ah:mm' // Everything else ( 7/10/2011 )
    })
}