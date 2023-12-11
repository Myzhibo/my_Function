console.log('**************  字符串  **************')
// replace
str = '1234TOS0S'
newStr = str.replace('T', ' ')
console.log("'replace'---", newStr)

str = `<p>济南高新区2021-2022学年第二学期七年级学业质量抽测</p>`
newStr = str.replace('<p>', "<p id='a'>")
console.log("'replace2'---", newStr)

str = "002_第5节 表示元素的符号";  
let newStr = str.substring(4);  	// 从原始字符串的第五个字符开始提取，直到字符串的末尾，形成一个新的字符串。
console.log(newStr);  // 输出: "第5节 表示元素的符号"

console.log('**************  数组  **************')
// splice
arr = [1, 2, 3, 4, 5]
i = arr.indexOf(2)
arr.splice(i, 1)
console.log("'splice'---", arr)

// shift(删掉第一个元素), unshift(在第一个位置添加元素)
arr = [1, 2, 3, 4, 5]
arr.shift()
console.log("'shift'---", arr)
arr = [1, 2, 3, 4, 5]
arr.unshift('A')
console.log("'unshift'---", arr)

// filter
arr = [1, 2, 3, 4, 5]
newArr = arr.filter((item) => {
  return item != 2
})
console.log("'filter'---", newArr)

arr = [{ _id: 1, name: 'tom' }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }]
newArr = arr.filter((item) => {
  return item._id != 2
})
console.log("'filter2'---", newArr)

// map
arr = [1, 2, 3, 4, 5]
newArr = arr.map((item) => {
  return item + 1
})
console.log("'map'---", newArr)

arr = ['全国', '北京', '天津']
newArr = arr.map((item) => {
  return { id: item, label: item }
})
console.log("'map2'---", newArr)

arr = [{ body: '<p>123</p>', id: 1 }]
newArr = arr.map((item) => {
  item.body = item.body.replace('<p', "<p id='forTrack'") // replace返回新字符串
  return item
})
console.log("'map3'---(1) 改变原数组后再返回", newArr)
newArr = arr.map((item) => {
  return item.body.replace('<p', "<p id='a'")
})
console.log("'map3'---(2) 直接返回了改变后的数组", newArr)

// some
var arr = [23, 44, 3]
res = arr.some((item) => {
  return item < 10
})
console.log("'some'---", res)
