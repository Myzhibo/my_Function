/* 小于10的拼接上0字符串 */
function addZero(s) {
  return s < 10 ? '0' + s : s
}
/* 获取当前时间 */
function now_sting() {
  const today = new Date()
  const Timestamp = Number(today) // Date格式转时间戳
  console.log(today)
  console.log('Timestamp： ', Timestamp)

  return String(
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
}
/* 字符串 转 时间戳 */
function toDate(strDate) {
  return new Date(strDate)
}

console.log('***********************获取当前时间***********************')
console.log(now_sting())
console.log('***********************String 转 Date***********************')
console.log(toDate('Mon Jul 18 2022 17:05:42'))
console.log(toDate('Jul 18 2022 17:05:42'))
console.log(toDate('2022/07/18 17:05:42'))
console.log(toDate('2022-07-18 17:05:42'))
console.log('***********************Date 转 String***********************')
console.log(new Date().toLocaleDateString())
console.log('***********************两个Date相减***********************')
const time1 = toDate('2023-09-19 17:19:42')
const today = new Date()
//时间差的毫秒数
var millisecond = today.getTime() - new Date(time1).getTime()
//时间差的秒数
seconds = Math.floor(millisecond / 1000)
//时间差的分钟数
mins = Math.ceil(millisecond / 1000 / 60)
//时间差的小时数
hours = Math.floor(millisecond / 1000 / 60 / 60)
//时间差的天数
days = Math.floor(millisecond / 1000 / 60 / 60 / 24)

console.log(`相差 ${seconds} 秒`)
console.log(`相差 ${mins} 分钟`)
console.log(`相差 ${hours} 小时`)
console.log(`相差 ${days} 天`)


console.log('***********************秒数 转成 分秒格式***********************')
mySeconds = 198
console.log('198s 是 ： ',   Math.floor(((mySeconds) / 60).toString().padStart(2, '0')),'min', (((mySeconds) % 60).toString().padStart(2, '0')),'s');


