import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router' //引入路由组件库
import router from './router/index' //引入路由配置index

import ElementUI from 'element-ui' //引入ElementUI
import 'element-ui/lib/theme-chalk/index.css' //引入ElementUI css库

// import './styles/utils.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router, //挂载路由
}).$mount('#app')
