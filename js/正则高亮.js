html = `<p style="margin-bottom: 12px;" id='myArticle_P'>In today's digital age, smartwatches(智能手表) are harmony(和谐) just for adults now. </p>`

keyword1 = 'smartwatches(智能手表) are harmony(和谐) just'
// 转义括号！ 替换全局！
console.log(keyword1.replace(/\(/g, '\\(').replace(/\)/g, '\\)'))
function a(html) {
  console.log(1)
  if (html) {
    return html.replace(
      // **************** 括号需要做转义
      new RegExp(keyword1.replace(/\(/g, '\\(').replace(/\)/g, '\\)'), 'gi'),
      (...args) => {
        return `<span style='background-color: red; color: white;'>${args[0]}</span>`
      }
    )
  }
}
console.log(a(html))

keyword2 = "In today's digital age"
function b(html) {
  console.log(2)
  if (html) {
    return html.replace(new RegExp(keyword2, 'gi'), (...args) => {
      return `<span style='background-color: red; color: white;'>${args[0]}</span>`
    })
  }
}
console.log(b(html))
