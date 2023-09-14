/** 普通用法 */
let p1 = Promise.resolve('1')
let p2 = Promise.resolve('普通用法')
function getData1() {
  Promise.all([p1, p2])
    .then((result) => {
      console.log(result)
    })
    .catch((error) => {
      console.log(error)
    })
}

/** async/await 用法 */
let p3 = Promise.resolve('2')
let p4 = Promise.resolve('async/await 用法')
async function getData2() {
  const result = await Promise.all([p3, p4])
  console.log(result)
}

/** async/await 用法 -- 循环调用 (常用于循环调用接口) */
let p5 = Promise.resolve('3')
let p6 = Promise.resolve('async/await 用法 -- 循环调用 (常用于循环调用接口)')
async function getData3() {
  let res = [p5, p6]
  const result = await Promise.all(
    res.map((item, index) => {
      return item
    })
  )
  console.log(result)
}

// 循环调用接口 示例
// const res2 = await Promise.all(
//   res.list.map((item, index) => {
//     return this.getList(item.text_id)
//   })
// )

getData1()
getData2()
getData3()
