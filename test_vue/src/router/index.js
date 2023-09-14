//1. 创建整个应用的路由器
import VueRouter from 'vue-router'

//2. 引入路由组件
import Layout from '../views/Layout/index.vue'
import HelloWorld from '../components/HelloWorld.vue'

//3. 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home' /* redirect 重定向。  当path为/时 ， 跳转到home */,
      children: [
        { path: '/home', name: 'home', component: HelloWorld }, //首页
      ],
    },
  ],
})
