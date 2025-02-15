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
const { checkPrime } = require('crypto')
const { resolve } = require('path')
const path = require('path')
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
          'UBUS=FG0Bq29YpO7bc3XBo49xt8aESY2vl9JY0-kA1UnbR56gQgUsgmZpxWWdXokcZn69', // 若验证错误：Login invalid identity  ==>> 需要更新cookie
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
          'UBUS=w0cnyFhxdhHs6qTd5DvRFRK7_2pTjOkxRZWtkQHrDvQLisGvf4IroFVo-FKZh8A2',
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

// GET请求 获取学科学段
function GetSubStage() {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://worksheet.hexinedu.com/api/open/rel/v1/subject_stage`)
      .then((response) => {
        const data = response.data.data
        let subInfo = []
        data.study_section_list.forEach((i) => {
          i.grade_subject_list[0].subject_list.forEach((s) => subInfo.push(s))
        })
        subInfo.push(data.civil_section_list[0].stage_section)
        subInfo.push(data.civil_section_list[0].subject_section)
        resolve(subInfo)
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
              reject(`文件创建失败：${error}`);  
            }
          },
        ) 
        resolve('创建成功！');
      }
    }, 10000)
  })
}

// 检查处理完的json是否存在prob字段
async function check() {
  console.log('************** 开始check');
  
  fs.readdir('./result', (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return;
    }
    
    let successCount = 0;
    files.forEach(file => {
      // 排除掉文件夹
      const fullPath = path.join('./result', file);
      const stats = fs.statSync(fullPath);
      if (stats.isFile()) {
        // 打印文件路径
        // console.log(fullPath);
        // 读取文件内容
        const content = fs.readFileSync(fullPath, 'utf8');
        let flated = flatData(JSON.parse(content))
        if(!flated.map(item => item.tag).filter(item => item).length) {
          console.log(fullPath, '打标签失败！' , false);
          return false
        }
        for (let i in flated) {
          for (let j in flated[i].tag) {
            if (Object.values(flated[i].tag).find(obj => obj.hasOwnProperty('prob'))&&
                Object.keys(flated[i].tag).includes('diffc') &&
                Object.keys(flated[i].tag).includes('qtype')
            ) {
              console.log(fullPath, ' -> 成功 <- ' , true);
              successCount++;
              return true
            } else {
              console.log(fullPath, '打标签失败！' , false);
              return false
            }
          }
        }
      }  
    });  
    if(successCount === files.length) {
      console.log('全部成功', true);
    }
  });
}

// 打平
const flatData = (obj, parentId = undefined) => {
  return obj.reduce((prev, curr) => {
    if (parentId !== undefined) {
      Object.assign(curr, {
        parentId: parentId,
      })
    }
    prev.push(curr)
    if (curr.children?.length > 0) {
      prev.push(...flatData(curr.children, curr.id))
    }
    return prev
  }, [])
}

async function main() {
  // // 输入工单号
  const uInput = await input()
  const ticket_ids = uInput?.match(/[a-zA-Z\d]{24}/g) ?? []
  console.log(ticket_ids)
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
  
  // 最终check 生成物中是否有'prob'标签
  check()
}

async function main2() {  
  try {  
    // 获取当前目录下除package以外全部的json文件  
    let files = await fs.promises.readdir(__dirname);  
    let jsonFiles = files.filter(file => {  
      const ext = file.split('.').pop().toLowerCase();  
      const base = file.split('.').slice(0, -1).join('.');  
      return ext === 'json' && !base.includes('package');  
    });  
  
    let timer = {};  
    console.log(jsonFiles);  
  
    const generatePromises = jsonFiles.map(async (file) => {  
      const filename = file.split('.').slice(0, -1).join('.');  
      // 获取学科、学段英文
      let subject = ''
      let stage = filename.includes('小学')
        ? 'primary'
        : (filename.includes('初中') || filename.includes('中考') || filename.includes('高级中等'))
        ? 'junior'
        : (filename.includes('高中') || filename.includes('高考'))
        ? 'senior'
        : ''
      const subInfo = await GetSubStage()
      for (let i in subInfo) {
        if (filename.includes(subInfo[i].cn_name)) {
          subject = subInfo[i].en_name
        }
      }
      if(subject === 'daode_fazhi'){
        subject = 'politics';
      }
  
      await generate('--', subject, stage, filename, timer);  
    });  
  
    // 等待所有 generate 调用完成  
    await Promise.all(generatePromises);  
  
    // 最终check 生成物中是否有prob标签  
    check();  
  } catch (error) {  
    console.error('Error:', error);  
  }  
}  


/* ***********************  入口  ********************** */

// 直接对目录中原生json打码，生成最终json   // 前提： 文件名上面有学科学段的中文
// main2()

// 通过工单号 先生成原生json再打码，生成最终生成物json
// main()

// 检查result文件夹中文件是否满足打标结果
// check()

function start() {
  if (process.argv.slice(2)[0] === 'main') {
    main();
  } else if (process.argv.slice(2)[0] === 'main2') {
    main2();
  }
}
start();
