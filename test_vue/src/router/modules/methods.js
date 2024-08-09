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
  {
    path: '/multi_select',
    name: 'multi_select',
    component: () => import('../../components/methods/MultiSelect.vue'),
  },
  {
    path: '/float_tool',
    name: 'float_tool',
    component: () => import('../../components/methods/WithFloatTool.vue'),
  },
  {
    path: '/test_html',
    name: 'test_html',
    component: () => import('../../components/methods/TestHtml.vue'),
  },
]

export default methodsRouter
