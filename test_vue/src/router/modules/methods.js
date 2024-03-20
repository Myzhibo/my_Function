const methodsRouter = [
  {
    path: '/hoverText',
    name: 'hoverText',
    component: () => import('../../components/methods/HoverText.vue'),
  },
  {
    path: '/selection',
    name: 'selection',
    component: () => import('../../components/methods/Selection.vue'),
  },
  {
    path: '/clickText',
    name: 'clickText',
    component: () => import('../../components/methods/ClickText.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../../components/methods/Login.vue'),
  },
  {
    path: '/leave_route',
    name: 'leave_route',
    component: () => import('../../components/methods/LeaveRoute.vue'),
  },
  {
    path: '/skeleton',
    name: 'skeleton',
    component: () => import('../../components/methods/Skeleton.vue'),
  },
]

export default methodsRouter
