console.log('**************  字符串  **************')
// replace
str = '1234TOS0S'
newStr = str.replace('T', ' ')
console.log("'replace'---", newStr)

str = `<p>济南高新区2021-2022学年第二学期七年级学业质量抽测</p>`
newStr = str.replace('<p>', "<p id='a'>")
console.log("'replace2'---", newStr)

str = "002_第5节 表示元素的符号";  
newStr = str.substring(4);  	// 从原始字符串的第五个字符开始提取，直到字符串的末尾，形成一个新的字符串。
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
arr = [23, 44, 3]
res = arr.some((item) => {
  return item < 10
})
console.log("'some'---", res)




console.log('******  数组 item的移动  *******')
/** 将 '二' 向后移动 2 个位置  (移动单个) */
arr = ['一', '二', '三', '四', '五'];  
index = 1; // 要移动的元素'二'的索引
step = 2;
arr.splice(index + step, 0, arr.splice(index, 1)[0]);  
console.log(arr); // 输出：[ '一', '三', '四', '二', '五' ]

/** 将 '二' 向后移动 2 个位置  (移动多个) */
arr = [1, 2, 3, 4, 5];  
itemsToMove = [2, 3]; // 需要移动的元素  
destinationIndex = 3; // 移动到的目标位置  
// 将要移动的元素临时存储在一个数组中  
tempArray = itemsToMove.map(item => arr.splice(arr.indexOf(item), 1)[0]);  
// 将要移动的元素插入到目标位置  
for (let i = tempArray.length - 1; i >= 0; i--) {  
  arr.splice(destinationIndex, 0, tempArray[i]);  
}  
console.log(arr); // 输出：[1, 4, 5, 2, 3]




console.log('******  数组 多个item的删除  ***每次删除后，回退一位坐标****')
array = [1, 2, 3, 4];
needRemove = [2, 4]
for (let i=0; i< array.length; i++){
  if (needRemove.includes(array[i])){
      array.splice(i, 1)
      i--
  }
}
console.log(array); // 输出: [1, 2]




console.log('****** js 一个对象数组，向其中一个item的id为5的item后面【插入】一个新的对象{a:1} ****')
objectArray = [  
  { id: 1, name: 'Object 1' },  
  { id: 2, name: 'Object 2' },  
  { id: 3, name: 'Object 3' },  
  { id: 4, name: 'Object 4' },  
  { id: 5, name: 'Object 5' }  
];  
// 在id为5的item后面插入一个新的对象{a: 1}  
objectArray.splice(objectArray.findIndex(item => item.id === 5) + 1, 0, { a: 1 });  
console.log(objectArray);

console.log('******  ****')
function findMaxLevel(array) {  
  let maxLevel = 0;  
  
  array.forEach(item => {  
    if (Array.isArray(item)) {  
      maxLevel = Math.max(maxLevel, findMaxLevel(item));  
    } else if (item.level > maxLevel) {  
      maxLevel = item.level;  
    }  
  });  
  
  return maxLevel;  
}  
  
const nestedArray = [  
  { id: 1, level: 1 },  
  { id: 2, level: 2, items: [{ id: 3, level: 3 }, { id: 4, level: 4 }] },  
  { id: 5, level: 1 },  
];  
  
const maxLevel = findMaxLevel(nestedArray);  
console.log(maxLevel); // 输出: 4