let readline = require('readline')
let rl = readline.createInterface(process.stdin, process.stdout)
// 1、多行输入部分
let arr = []

console.log(`请输入工单号或链接: `)
rl.on('line', (line) => {
  arr.push(line.trim())
  console.log(arr)
  if (arr.length !== 0 && arr.length === parseInt(arr[0]) + 1) {
    getResult(arr)
  }
})
// 2、逻辑代码部分
function getResult(arr) {
  console.log(typeof arr[0]) //'string'
  console.log(arr) //[ '2', '12', '34' ]

  arr[0] = Number(arr[0])
  console.log(typeof arr[0]) //'number'
  console.log(arr) //[ 2, '12', '34' ]
}
