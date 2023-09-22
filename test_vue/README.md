# 包

## node

- nvm use 14

## sass

- 1 npm i -D sass-loader@8.x // 安装
  2 npm i node-sass@4.14.1 // 安装

## elementUI

- npm i element-ui -S

# 笔记

1. 关于 App.vue 、'router-view'、router 之间的关系

- App.vue 在模版中定义 router-view 用来指向当前组件下的路由展示区
- router/index.js 中 component: Layout 主路由指向的组件 就是 App.vue 中 router-view 所指向的画面
- 到了 Layout/index.vue 中模版仍然定义了 router-view ， 那他就指向了路由中 component: Layout 所重定向的 path 所指向的 component: HelloWorld
