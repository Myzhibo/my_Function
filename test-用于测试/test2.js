str = 'ge, smartwatches(智能手表) are not just for adults no'
const reg = new RegExp('smartwatches(智能手表)', 'gi')
console.log(
  str.replace(reg, ($0, $1, $2) => {
    return [$0, $1, $2]
  })
)
