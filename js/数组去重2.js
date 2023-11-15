///////////数组内部对象obj根据某个字段去重

arr = [
  { key: '1130', needBeOperated: 'Q' },
  { key: '1412', needBeOperated: 'Z' },
  { key: '4123', needBeOperated: 'Q' },
  { key: '1231', needBeOperated: 'Q' },
  { key: '2347', needBeOperated: 'Z' },
]

let obj = {}
newArr = arr.reduce(function (item, next) {
  obj[next.needBeOperated]
    ? ''
    : (obj[next.needBeOperated] = true && item.push(next))
  return item
}, [])

console.log(newArr)
