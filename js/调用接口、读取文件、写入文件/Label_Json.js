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

// 命令行交互
function input() {
  return new Promise(async (resolve, reject) => {
    rl.question(`请输入工单号或链接: `, (ticket_id) => {
      resolve(ticket_id)
      rl.close()
    })
  })
}

// GET请求 通过工单号 获取学科、学段 、json编号 、 json文件名
function myGetSubjectAndStage(ticket_id) {
  return new Promise((resolve, reject) => {
    axios({
      // url: 'http://worksheet.hexinedu.com/api/admin/ticket/v1/handle?ticket_id=6524f63d45c55890fbb2766c',
      // url: 'http://worksheet.hexinedu.com/api/admin/ticket/v1/handle?ticket_id=6524f61f17b9ba7dfcee0d39',
      url: `http://worksheet.hexinedu.com/api/admin/ticket/v1/handle?ticket_id=${ticket_id}`,
      method: 'get',
      data: {},
      headers: {
        cookie:
          'UBUS=YnbsvrY-EBt2vCx3Em-leD4KllM-smqhtkCHNhNvTcoDJR3WwyqQ1TEHfRyrOGYW',
      },
    })
      .then((response) => {
        obj = {
          subject: response.data.data.subject,
          stage: response.data.data.stage,
          business_project_id:
            response.data.data.xdoc_planning[0].extra[0].business_project_id,
          book_name: response.data.data.book_name,
        }
        resolve(obj)
      })
      .catch((error) => {
        console.error('请求失败:', error)
      })
  })
}

// GET请求 下载json到目录
function myGetDownJSON(ticket_id, jsonId) {
  return new Promise((resolve, reject) => {
    axios({
      url: `http://hexin-worksheet.hexinedu.com/worksheet/${ticket_id}/deliverable/xdoc/${jsonId}.json`,
      method: 'get',
      data: {},
      headers: {
        cookie:
          'UBUS=YnbsvrY-EBt2vCx3Em-leD4KllM-smqhtkCHNhNvTcoDJR3WwyqQ1TEHfRyrOGYW',
      },
    })
      .then((response) => {
        const data = response.data
        resolve(data)
      })
      .catch((error) => {
        console.error('请求失败:', error)
      })
  })
}

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

// 主流程
function generate(ticket_id, subject, stage, filename, timer) {
  return new Promise(async (resolve, reject) => {
    console.log(`${filename} - 开始任务`)
    /************** 读取原json...*/
    console.log(`学科: ${subject} , 学段: ${stage}`)
    requestData = {
      name: '测试1',
      subject: subject,
      stage: stage,
      node_json: JSON.parse(await read(filename + '.json')),
    }
    /************** 获取project_id...'*/
    let project_id = await myPost(
      'http://content-resource.hexinedu.com/api/admin/manual/json/tag',
      requestData
    )
    let t = 10
    // let count = jsonFiles.length
    timer[project_id] = setInterval(async () => {
      let result = await myGet(project_id)
      console.log(
        `${stage}, ${subject}  -   工单id: ${ticket_id} - project_id: ${project_id} - ${filename} - 正在打码中，请稍等... 已耗时 ${t}s`
      )
      t += 10
      if (result.data) {
        clearInterval(timer[project_id])
        // console.log('************** 生成新Json...')
        let fs = require('fs')
        fs.mkdir('result', (err) => {})
        fs.writeFile(
          'result/' + filename + '.json',
          // 漂亮的json格式
          JSON.stringify(result.data, null, 4),
          (error) => {
            if (error) {
              console.log(`创建失败：${error}`)
            }
          },
          resolve(`创建成功！`)
        )
      }
    }, 10000)
  })
}

async function main() {
  // 输入工单号
  const uInput = await input()
  const ticket_ids = uInput?.match(/[a-zA-Z\d]{24}/g) ?? []
  for (let ticket_id of ticket_ids) {
    const { subject, stage, business_project_id, book_name } =
      await myGetSubjectAndStage(ticket_id)
    console.log(subject, stage, business_project_id, book_name)

    const myJson = await myGetDownJSON(ticket_id, business_project_id)

    // 写入文件
    fs.writeFile(
      book_name + '.json',
      // 漂亮的json格式
      JSON.stringify(myJson, null, 4),
      (error) => {
        if (error) {
          console.log(`创建失败：${error}`)
        }
        // console.log('创建成功！')
      }
    )
    let timer = {}
    await generate(ticket_id, subject, stage, book_name, timer)
  }

  /** 直接对目录中的json进行打码*/
  // // 获取当前目录下除package以外全部的json文件
  // let jsonFiles = []
  // fs.readdir(__dirname, async (err, files) => {
  //   if (err) {
  //     console.error(err)
  //     return
  //   }
  //   jsonFiles = files.filter((file) => {
  //     return (
  //       file.split('.')[file.split('.').length - 1] === 'json' &&
  //       !file.split('.')[file.split('.').length - 2].includes('package')
  //     )
  //   })
  //   let timer = {}
  //   for (let file of jsonFiles) {
  //     fileArr = file.split('.')
  //     fileArr.pop()
  //     filename = fileArr.join('.')
  //     console.log(jsonFiles)
  //     await generate(subject, stage, filename, timer)
  //   }
  // })
}
main()
