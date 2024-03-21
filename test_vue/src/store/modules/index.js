const storeModules = require.context('./', false, /\.js$/)
const modules = {}

storeModules.keys().forEach(key => {
  if (key === './index.js' || key === './template.js') return
  const obj = storeModules(key).default
  const name = obj.name || 'error'
  delete obj.name
  modules[name] = obj
})

export default modules
