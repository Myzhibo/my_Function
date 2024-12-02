const XLSX = require('xlsx');
const axios = require('axios')

// 递归函数
function recursion(node, sheetData) {
  let emptyPlaceholder = [];
  if (node.node_level) {
    for (let i = 0; i < node.node_level - 1; i++) {
      emptyPlaceholder.push('');
    }
    if(node.children?.length) sheetData.push(['', ...emptyPlaceholder,  node.node_name])
    else sheetData.push([node.node_id, ...emptyPlaceholder,  node.node_name])
    
  }
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach(childNode => {
      recursion(childNode, sheetData);
    });
  }
  return sheetData;
}

// 获取json数据
function myGetJSON(stage, subject) {
  return new Promise((resolve, reject) => {
    axios({
      url: `http://content-resource.hexinedu.com/api/admin/tag/json/get?stage=${stage}&subject=${subject}&customer_id=2`,
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

// 学科学段
function GetSubStage() {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://worksheet.hexinedu.com/api/open/rel/v1/subject_stage`)
      .then((response) => {
        const data = response.data.data
        let subInfo = []
        data.study_section_list.forEach((i) => {
          subInfo.push(i.grade_subject_list[0].subject_list)
        })
        resolve(subInfo)
      })
      .catch((error) => {
        console.error('请求失败:', error)
      })
  })
}

async function renderExcel (ssInfo, exName) {
  async function getNewTabCount () {
    const wb = XLSX.utils.book_new();

    for await (const item of ssInfo) {
      const res = await myGetJSON(exName, item.en_name);
      if(res.data.customer_tree) {
        let sheetData = [];
        for(let item of res.data.customer_tree?.[0].children) { 
          sheetData = recursion(item, sheetData);
        }
        console.log(`生成excel -${exName} - ${item.en_name}`);
        XLSX.utils.book_append_sheet(wb, XLSX.utils.aoa_to_sheet(sheetData), item.en_name);
      }
    }

    // 写入一个文件
    console.log(`写入文件  -  ${exName}.xlsx`)
    XLSX.writeFile(wb, `${exName}.xlsx`);
  }
  await getNewTabCount();
}

async function main() {
  const ssInfo = await GetSubStage();
  await renderExcel(ssInfo[0], 'primary')
  await renderExcel(ssInfo[1], 'junior')
  await renderExcel(ssInfo[2], 'senior')
}

main();