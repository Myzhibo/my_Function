import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import HelloWorld from '../views/HelloWorld.vue';
import UploadBook from '../views/UploadBook.vue';
import ImageDetail from '../views/ImageDetail.vue';

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
  // 其他路由...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
  
export default router;