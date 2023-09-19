let ARR = [{ a: 1 }]

const _image = (item) =>
  new Promise(async (resolve) => {
    console.log(1)
    // item.onload = async () => {
    await resolve()
    // }
    console.log(2)
    // item.onerror = () => resolve()
    console.log(3)
    console.log(item)
  })

const test = async () => {
  console.log(0)
  await Promise.all(
    ARR.map(async (item) => {
      console.log('前')
      await _image(item)
      console.log('后')
    })
  )
  console.log('结束')
}

test()
