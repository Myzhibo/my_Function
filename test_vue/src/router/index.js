//1. 创建整个应用的路由器
import VueRouter from 'vue-router'

//2. 引入路由组件
import Layout from '../views/Layout/index.vue'

//4. 模块化引入外部路由
import edits from './modules/edits'

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
          path: '/lay1',
          name: 'lay1',
          component: () => import('../components/A_LayoutTemplate.vue'),
        },
        {
          path: '/lay2',
          name: 'lay2',
          component: () => import('../components/A_LayoutTemplate2.vue'),
        },
        {
          path: '/form',
          name: 'form',
          component: () => import('../views/MyElementUI/MyForm.vue'),
        },
        {
          path: '/vir',
          name: 'vir',
          component: () => import('../components/CP_Virtual.vue'),
        },
        {
          path: '/vir2',
          name: 'vir2',
          component: () => import('../components/CP_Virtual2.vue'),
        },
        ...edits,
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
