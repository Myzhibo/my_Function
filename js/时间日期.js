//小于10的拼接上0字符串
function addZero(s) {
  return s < 10 ? '0' + s : s
}

const today = new Date()
const now_time = String(
  '当前时间: ' +
    today.getFullYear() +
    '-' +
    addZero(today.getMonth() + 1) +
    '-' +
    addZero(today.getDate()) +
    ' ' +
    addZero(today.getHours()) +
    ':' +
    addZero(today.getMinutes()) +
    ':' +
    addZero(today.getSeconds())
)

console.log(now_time)
