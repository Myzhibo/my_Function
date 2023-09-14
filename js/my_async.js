function takeLongTime() {
  return new Promise((resolve) => {
    setTimeout(() => resolve('long_time_value'), 1000)
  })
}

async function test() {
  let v = await takeLongTime() //takeLongTime 得返回一个promise对象 才会等他
  console.log(v)
  console.log(1)
}
test()
