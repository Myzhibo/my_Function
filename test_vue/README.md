# 包

## node

- nvm use 14

## sass

- 1 npm i sass -D
  2 npm i -D sass-loader@8.x
  3 npm i node-sass@4.14.1

## elementUI

- npm i element-ui -S

## Tree 组件安装插件

- yarn add vue-contextmenujs

### 在 main.js 文件中使用

```js
import Contextmenu from 'vue-contextmenujs'
Vue.use(Contextmenu)
```

```js
// 在组件中调用显示菜单
// this.$contextmenu(options:MenuOptions);
// 鼠标点击或滚轮自动销毁, 也可手动销毁
// this.$contextmenu.destroy();

// 去除浏览器默认菜单
```

# 笔记

1. 关于 App.vue 、'router-view'、router 之间的关系

- App.vue 在模版中定义 router-view 用来指向当前组件下的路由展示区
- router/index.js 中 component: Layout 主路由指向的组件 就是 App.vue 中 router-view 所指向的画面
- 到了 Layout/index.vue 中模版仍然定义了 router-view ， 那他就指向了路由中 component: Layout 所重定向的 path 所指向的 component: HelloWorld
