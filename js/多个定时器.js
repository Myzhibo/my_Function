ids = ['0000001', '0000002']

timer = {}
for (let id of ids) {
  t = 0
  timer[id] = setInterval(async () => {
    console.log(id)
    t += 1
    if (t === 5) clearInterval(timer['0000002'])
  }, 1000)
}
