/**
 * 1. npm install axios
 * 2. npm install express
 */

const axios = require('axios')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
var express = require('express') //express框架模块
var fs = require('fs') //文件模块
var bodyParser = require('body-parser') //对post请求的请求体进行解析模块
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// POST请求
function myPost(url, requestData) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, requestData)
      .then((response) => {
        const data = response.data
        if (!data.data) {
          console.log(data)
        } else {
          resolve(data.data.project_id)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  })
}

// GET请求
function myGet(project_id) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `http://content-resource.hexinedu.com/api/admin/tag_project/json?project_id=${project_id}`
      )
      .then((response) => {
        const data = response.data
        resolve(data)
      })
      .catch((error) => {
        console.error('请求失败:', error)
      })
  })
}

// 读取文件
function read(dir) {
  return new Promise((resolve, reject) => {
    fs.readFile(dir, 'utf-8', (err, data) => {
      if (err) {
        reject(console.log(err))
      } else {
        resolve(data)
      }
    })
  })
}

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
  const filename = await input()

  console.log('************** 读取原json...')
  requestData = {
    name: '测试1',
    subject: 'geography',
    stage: 'senior',
    node_json: JSON.parse(await read(filename + '.json')),
  }

  console.log('************** 获取project_id...')
  let project_id = await myPost(
    'http://content-resource.hexinedu.com/api/admin/manual/json/tag',
    requestData
  )
  console.log(project_id)

  console.log('************** 获取打完标签的json...')
  // let result = await myGet('6454b8c7ebd3b0a760ce7d8a')

  let t = 10
  let timer = setInterval(async () => {
    let result = await myGet(project_id)
    console.log('正在打码中，请稍等... 已耗时' + t + 's')
    t += 10
    if (result.data) {
      clearInterval(timer)

      console.log('************** 生成新Json...')
      let fs = require('fs')
      fs.mkdir('result', (err) => {})
      fs.writeFile(
        'result/' + filename + '.json',
        // 漂亮的json格式
        JSON.stringify(result, null, 4),
        (error) => {
          if (error) {
            console.log(`创建失败：${error}`)
          }
          console.log(`创建成功！`)
        }
      )
    }
  }, 10000)
}
main()
