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
]

export default methodsRouter
