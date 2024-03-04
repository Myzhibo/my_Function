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
]

export default methodsRouter
