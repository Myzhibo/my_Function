const methodsRouter = [
  {
    path: '/mycard',
    name: 'mycard',
    component: () => import('../../components/mynpmTest/MyCard.vue'),
  },
]

export default methodsRouter
