import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import HelloWorld from '../views/HelloWorld.vue';
import UploadBook from '../views/UploadBook.vue';
import ImageDetail from '../views/ImageDetail.vue';
import Vue3API from '../views/Vue3API.vue';
import Authority from '../views/Authority.vue';
import VTable from '../views/VTable.vue';
import Layout1 from '../views/Layout/Layout1.vue';

import componentsRouter from './componentsRouter.ts'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/UploadBook',
    name: 'UploadBook',
    component: UploadBook,
  },
  {
    path: '/ImageDetail',
    name: 'ImageDetail',
    component: ImageDetail,
  },
  {
    path: '/Authority',
    name: 'Authority',
    component: Authority,
  },
  {
    path: '/VTable',
    name: 'VTable',
    component: VTable,
  },
  {
    path: '/Layout1',
    name: 'Layout1',
    component: Layout1,
  },
  {
    path: '/Vue3API',
    name: 'Vue3API',
    component: Vue3API,
  },
  // 其他路由...
  ...componentsRouter
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
  
export default router;