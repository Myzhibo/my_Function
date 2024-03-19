
var arr = [
  1,
  1,
  'true',
  'true',
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  'NaN',
  0,
  0,
  'a',
  'a',
  {},
  {},
]

const newArr = arr.filter((item, i, arr)=>{
  return arr.indexOf(item) === i
})

console.log(newArr);