console.log('**************  字符串  **************')
// replace
str = '1234TOS0S'
newStr = str.replace('T', ' ')
console.log("'replace'---", newStr)

console.log('**************  数组  **************')
// splice
arr = [1, 2, 3, 4, 5]
i = arr.indexOf(2)
arr.splice(i, 1)
console.log("'splice'---", arr)

// filter
arr = [1, 2, 3, 4, 5]
newArr = arr.filter((item) => {
  return item != 2
})
console.log("'filter'---", newArr)

arr = [{ _id: 1 }, { _id: 2 }, { _id: 3 }, { _id: 4 }, { _id: 5 }]
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
