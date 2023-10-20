const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// 命令行交互
function input() {
  return new Promise((resolve, reject) => {
    rl.question(`请输入原json文件名: `, (name) => {
      filename = name
      resolve(filename)
      rl.close()
    })
  })
}

async function main() {
  // 输入工单号下载json
  const filename = await input()
  console.log(filename)
}
main()
