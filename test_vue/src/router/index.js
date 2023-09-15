//1. 创建整个应用的路由器
import VueRouter from 'vue-router'

//2. 引入路由组件
import Layout from '../views/Layout/index.vue'

//3. 创建并暴露一个路由器
export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home' /* redirect 重定向。  当path为/时 ， 跳转到home */,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../components/HelloWorld.vue'),
        },
        {
          path: '/table',
          name: 'table',
          component: () => import('../components/Table.vue'),
        },
      ],
    },
    //配置404
    {
      path: '/404',
      name: '404',
      hidden: false,
      meta: { title: '404' },
      component: () => import('../views/404.vue'),
    },
    {
      path: '*',
      redirect: '/404',
    },
  ],
})
