html = `<p style="margin-bottom: 12px;" id='myArticle_P'>In today's digital age, smartwatches(智能手表) are not just for adults now. The market for kids is growing, with several characteristics and benefits.irst up is h also provides protective control, protecting kids' safety. Its high-quality screen and extended(延长的) energy life are certain advantages. However, it has limited harmony(和谐) and may require a cave following characteristics and parent-related control features. Can they be tailored(定制)? Yes, many  offer customization(定制化) choices, allowing kids to tailor their tool. How long do they last? Energy life changes depending on the model and application, but most have good energy life.</p>`

keyword1 = 'smartwatches(智能手表)'
function a(html) {
  console.log(1)
  if (html) {
    return html.replace(
      new RegExp(keyword1.replace('(', '\\(').replace(')', '\\)'), 'gi'),
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
