arr = [
  { key: '1', needBeOperated: 'Q' },
  { key: '2', needBeOperated: 'Z' },
  { key: '3', needBeOperated: 'Q' },
  { key: '4', needBeOperated: 'Z' },
  { key: '5', needBeOperated: 'Q' },
]


///////////数组内部对象obj根据某个字段去重  (重复数据保留  旧  的)
let obj = {}
let newArr = arr.reduce(function (item, next) {
  obj[next.needBeOperated]
    ? ''
    : (obj[next.needBeOperated] = true && item.push(next))
  return item
}, [])

// [
//   { key: '1130', needBeOperated: 'Q' },
//   { key: '1412', needBeOperated: 'Z' } 
// ]
console.log(newArr)


///////////数组内部对象obj根据某个字段去重  (重复数据保留  新  的)
let obj2 = {};
arr.forEach(obj => {  
  obj2[obj.needBeOperated] = obj; 
});  
let newArr2 = Object.values(obj2);  

console.log(newArr2)