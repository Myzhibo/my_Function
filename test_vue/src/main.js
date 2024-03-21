import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router' //引入路由组件库
import router from './router/index' //引入路由配置index

import ElementUI from 'element-ui' //引入ElementUI
import 'element-ui/lib/theme-chalk/index.css' //引入ElementUI css库

import Contextmenu from 'vue-contextmenujs' //引入右键菜单库

import localforage from 'localforage'

import vInfiniteScroll from 'vue-infinite-scroll';  

import store from './store'                     //main.js 引入vuex配置index

// import './styles/utils.scss'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Contextmenu)
Vue.use(vInfiniteScroll);
Vue.use(store);

Vue.config.productionTip = false

localforage.config({ name: 'myDB' })
Vue.prototype.$localForage = localforage

// prod环境清除所有console.log
if (process.env.NODE_ENV === 'production') {
  if (window) {
    window.console.log = function () {}
  }
}

new Vue({
  render: (h) => h(App),
  store,                                         //挂载vuex
  router, //挂载路由
}).$mount('#app')
